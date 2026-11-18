import assert from "node:assert/strict";
import test from "node:test";
import {
  amountInGreekWords,
  calculateApolysi,
  calculateBmi,
  calculateCarTekmirio,
  calculateDiscount,
  calculateDoro,
  calculateFuelCost,
  calculateHomeTekmirio,
  calculateLeaveAllowance,
  calculateLoan,
  calculateMoria,
  calculateVat,
  convertGreeklish,
  countWords,
  generatePassword,
  isValidAfm,
  isValidAmka,
} from "../lib/tool-calculations.ts";

function assertClose(actual, expected, path = "value") {
  if (typeof expected === "number") {
    assert.ok(
      Math.abs(actual - expected) < 1e-9,
      `${path}: expected ${expected}, received ${actual}`,
    );
    return;
  }
  if (expected && typeof expected === "object") {
    assert.deepEqual(Object.keys(actual).sort(), Object.keys(expected).sort(), `${path} keys`);
    for (const key of Object.keys(expected)) {
      assertClose(actual[key], expected[key], `${path}.${key}`);
    }
    return;
  }
  assert.equal(actual, expected, path);
}

async function examples(t, rows, action) {
  for (const [name, input, expected] of rows) {
    await t.test(name, () => assertClose(action(input), expected));
  }
}

const afmExamples = [
  ["all zeroes", "000000000", true],
  ["base digit one", "000000012", true],
  ["base digit two", "000000024", true],
  ["base digit three", "000000036", true],
  ["base digit four", "000000048", true],
  ["base digit five wraps check digit", "000000050", true],
  ["base digit six", "000000061", true],
  ["base digit seven", "000000073", true],
  ["base digit eight", "000000085", true],
  ["base digit nine", "000000097", true],
];

const amkaExamples = [
  ["earliest accepted date", "01011900001", true],
  ["leap day in 2000", "29022000001", true],
  ["last day of 2025", "31122025001", true],
  ["valid date in current year", "15062026001", true],
  ["January date", "31012001001", true],
  ["April date", "30042004001", true],
  ["non-leap February", "28022023001", true],
  ["October date", "31102019001", true],
  ["leap day in 2004", "29022004001", true],
  ["first day of current year", "01012026001", true],
];

test("AFM/AMKA checker: 10 valid AFM examples", async (t) => {
  await examples(t, afmExamples, (value) => isValidAfm(value));
});

test("AFM/AMKA checker: 10 valid AMKA date examples", async (t) => {
  await examples(t, amkaExamples, (value) => isValidAmka(value, 2026));
});

test("AFM/AMKA checker rejects invalid checksum, date and length", async (t) => {
  const invalidAfms = [
    "000000001", "000000011", "000000023", "000000035", "000000047",
    "000000059", "000000060", "000000072", "000000084", "12345678",
  ];
  const invalidAmkas = [
    "00012000001", "31022000001", "29022001001", "01001900001", "01012027001",
    "31132000001", "32012000001", "0101200000", "010120000000", "01010000001",
  ];
  for (const [index, value] of invalidAfms.entries()) {
    await t.test(`invalid AFM ${index + 1}`, () => assert.equal(isValidAfm(value), false));
  }
  for (const [index, value] of invalidAmkas.entries()) {
    await t.test(`invalid AMKA ${index + 1}`, () => assert.equal(isValidAmka(value, 2026), false));
  }
});

test("Apolysi: 10 compensation calculations", async (t) => {
  await examples(t, [
    ["one year", ["1000", "1", "yes"], { months: 1, amount: 1000 }],
    ["five years", ["1200", "5", "yes"], { months: 5, amount: 6000 }],
    ["notice uplift", ["1000", "5", "no"], { months: 7.5, amount: 7500 }],
    ["24-year cap", ["1000", "24", "yes"], { months: 24, amount: 24000 }],
    ["cap above 24 years", ["1000", "30", "yes"], { months: 24, amount: 24000 }],
    ["uplift after cap", ["900", "30", "no"], { months: 36, amount: 32400 }],
    ["two years", ["2000", "2", "yes"], { months: 2, amount: 4000 }],
    ["minimum salary", ["0.01", "1", "yes"], { months: 1, amount: 0.01 }],
    ["comma decimal salary", ["1250,50", "4", "yes"], { months: 4, amount: 5002 }],
    ["maximum accepted service", ["1500", "60", "no"], { months: 36, amount: 54000 }],
  ], ([salary, years, notice]) => calculateApolysi(salary, years, notice));
});

test("Arithmografos: 10 currency-to-words examples", async (t) => {
  await examples(t, [
    ["zero", "0", "Μηδέν ευρώ"],
    ["one euro", "1", "Ένα ευρώ"],
    ["ten euros", "10", "Δέκα ευρώ"],
    ["compound tens", "21", "Είκοσι ένα ευρώ"],
    ["one hundred", "100", "Εκατό ευρώ"],
    ["one hundred one", "101", "Εκατό ένα ευρώ"],
    ["one thousand", "1000", "Χίλια ευρώ"],
    ["euros and cents", "1452.30", "Χίλια τετρακόσια πενήντα δύο ευρώ και τριάντα λεπτά"],
    ["one million", "1000000", "Ένα εκατομμύριο ευρώ"],
    ["round cents", "1.999", "Δύο ευρώ"],
  ], (value) => amountInGreekWords(value));
});

test("BMI: 10 BMI and BMR examples", async (t) => {
  await examples(t, [
    ["underweight female", ["50", "170", "20", "female"], { bmi: 17.301038062283737, category: "Ελλιποβαρής", bmr: 1301.5 }],
    ["normal female", ["60", "160", "25", "female"], { bmi: 23.4375, category: "Φυσιολογικό βάρος", bmr: 1314 }],
    ["normal male", ["70", "175", "30", "male"], { bmi: 22.857142857142858, category: "Φυσιολογικό βάρος", bmr: 1648.75 }],
    ["overweight male", ["90", "180", "40", "male"], { bmi: 27.777777777777775, category: "Υπέρβαρος", bmr: 1830 }],
    ["normal near lower threshold", ["45", "155", "18", "female"], { bmi: 18.730489073881373, category: "Φυσιολογικό βάρος", bmr: 1167.75 }],
    ["overweight older male", ["100", "190", "50", "male"], { bmi: 27.70083102493075, category: "Υπέρβαρος", bmr: 1942.5 }],
    ["high normal female", ["80", "165", "35", "female"], { bmi: 29.384756657483933, category: "Υπέρβαρος", bmr: 1495.25 }],
    ["underweight male", ["55", "180", "28", "male"], { bmi: 16.975308641975307, category: "Ελλιποβαρής", bmr: 1540 }],
    ["obese female", ["120", "170", "60", "female"], { bmi: 41.52249134948097, category: "Παχυσαρκία", bmr: 1801.5 }],
    ["normal male with decimal weight", ["65", "165", "22", "male"], { bmi: 23.875114784205696, category: "Φυσιολογικό βάρος", bmr: 1576.25 }],
  ], ([weight, height, age, gender]) => calculateBmi(weight, height, age, gender));
});

const vatExamples = [
  ["add 24 percent", ["100", 24, "add"], { net: 100, vat: 24, total: 124 }],
  ["add 13 percent", ["200", 13, "add"], { net: 200, vat: 26, total: 226 }],
  ["add 6 percent", ["50", 6, "add"], { net: 50, vat: 3, total: 53 }],
  ["add zero amount", ["0", 24, "add"], { net: 0, vat: 0, total: 0 }],
  ["add decimal amount", ["12.5", 24, "add"], { net: 12.5, vat: 3, total: 15.5 }],
  ["remove 24 percent", ["124", 24, "remove"], { net: 100, vat: 24, total: 124 }],
  ["remove 13 percent", ["226", 13, "remove"], { net: 200, vat: 26, total: 226 }],
  ["remove 6 percent", ["53", 6, "remove"], { net: 50, vat: 3, total: 53 }],
  ["remove decimal amount", ["12.4", 24, "remove"], { net: 10, vat: 2.4, total: 12.4 }],
  ["remove zero amount", ["0", 6, "remove"], { net: 0, vat: 0, total: 0 }],
];

test("FPA: 10 VAT examples", async (t) => {
  await examples(t, vatExamples, ([amount, rate, mode]) => calculateVat(amount, rate, mode));
});

test("Daneio: 10 monthly-payment and interest examples", async (t) => {
  await examples(t, [
    ["zero interest, one year", ["1000", "0", "1"], { monthlyPayment: 83.33333333333333, totalPayment: 1000, totalInterest: 0 }],
    ["12 percent, one year", ["10000", "12", "1"], { monthlyPayment: 888.4878867834161, totalPayment: 10661.854641400994, totalInterest: 661.8546414009943 }],
    ["20-year loan", ["100000", "6", "20"], { monthlyPayment: 716.4310584781728, totalPayment: 171943.45403476147, totalInterest: 71943.45403476147 }],
    ["zero interest, five years", ["5000", "0", "5"], { monthlyPayment: 83.33333333333333, totalPayment: 5000, totalInterest: 0 }],
    ["10-year loan", ["25000", "5", "10"], { monthlyPayment: 265.16378809768884, totalPayment: 31819.65457172266, totalInterest: 6819.654571722662 }],
    ["30-year mortgage", ["120000", "3.5", "30"], { monthlyPayment: 538.8536253705881, totalPayment: 193987.30513341172, totalInterest: 73987.30513341172 }],
    ["high interest short term", ["15000", "24", "3"], { monthlyPayment: 588.4927889669718, totalPayment: 21185.740402810985, totalInterest: 6185.740402810985 }],
    ["large principal", ["1000000", "7.5", "15"], { monthlyPayment: 9270.12360002731, totalPayment: 1668622.2480049157, totalInterest: 668622.2480049157 }],
    ["small positive interest", ["100000", "0.1", "2"], { monthlyPayment: 4171.008330859055, totalPayment: 100104.19994061731, totalInterest: 104.19994061731268 }],
    ["25-year loan", ["250000", "10", "25"], { monthlyPayment: 2271.7518638501533, totalPayment: 681525.559155046, totalInterest: 431525.559155046 }],
  ], ([principal, rate, years]) => calculateLoan(principal, rate, years));
});

test("Doro: 10 Christmas and Easter period examples", async (t) => {
  const rows = [
    ["full Christmas period", ["1000", "2026-05-01", new Date(2026, 10, 18)], { days: 245, ratio: 1, doro: 1000, type: "Δώρο Χριστουγέννων" }],
    ["hire date today: 44 days to year end", ["1000", "2026-11-18", new Date(2026, 10, 18)], { days: 44, ratio: 44 / 245, doro: 44000 / 245, type: "Δώρο Χριστουγέννων" }],
    ["last day of Christmas period", ["1000", "2026-12-31", new Date(2026, 11, 31, 12)], { days: 1, ratio: 1 / 245, doro: 1000 / 245, type: "Δώρο Χριστουγέννων" }],
    ["two last Christmas days", ["1000", "2026-12-30", new Date(2026, 11, 30, 12)], { days: 2, ratio: 2 / 245, doro: 2000 / 245, type: "Δώρο Χριστουγέννων" }],
    ["hired before Christmas period", ["1000", "2026-01-01", new Date(2026, 10, 18)], { days: 245, ratio: 1, doro: 1000, type: "Δώρο Χριστουγέννων" }],
    ["full Easter period", ["1000", "2026-01-01", new Date(2026, 2, 15)], { days: 120, ratio: 1, doro: 500, type: "Δώρο Πάσχα" }],
    ["Easter period from February", ["1000", "2026-02-01", new Date(2026, 2, 15)], { days: 89, ratio: 89 / 120, doro: 500 * 89 / 120, type: "Δώρο Πάσχα" }],
    ["eight days to Easter period end", ["1000", "2026-04-23", new Date(2026, 3, 23)], { days: 8, ratio: 8 / 120, doro: 500 * 8 / 120, type: "Δώρο Πάσχα" }],
    ["last Easter-period day", ["1000", "2026-04-30", new Date(2026, 3, 30, 12)], { days: 1, ratio: 1 / 120, doro: 500 / 120, type: "Δώρο Πάσχα" }],
    ["different salary in Christmas period", ["1200", "2026-11-18", new Date(2026, 10, 18)], { days: 44, ratio: 44 / 245, doro: 52800 / 245, type: "Δώρο Χριστουγέννων" }],
  ];
  await examples(t, rows, ([salary, date, now]) => calculateDoro(salary, date, now));
});

test("Discount: 10 price and percentage examples", async (t) => {
  await examples(t, [
    ["no discount", ["100", "0"], { final: 100, saved: 0 }],
    ["full discount", ["100", "100"], { final: 0, saved: 100 }],
    ["20 percent", ["150", "20"], { final: 120, saved: 30 }],
    ["50 percent", ["80", "50"], { final: 40, saved: 40 }],
    ["10 percent", ["99.99", "10"], { final: 89.991, saved: 9.999 }],
    ["comma decimal price", ["12,50", "20"], { final: 10, saved: 2.5 }],
    ["decimal percentage", ["200", "12.5"], { final: 175, saved: 25 }],
    ["zero price", ["0", "25"], { final: 0, saved: 0 }],
    ["large price", ["1000000", "1"], { final: 990000, saved: 10000 }],
    ["one percent", ["1", "1"], { final: 0.99, saved: 0.01 }],
  ], ([price, discount]) => calculateDiscount(price, discount));
});

test("Epidoma Adeias: 10 allowance examples", async (t) => {
  await examples(t, [
    ["one working day", ["1200", "1"], { days: 0, amount: 2 }],
    ["15 days", ["1200", "15"], { days: 1, amount: 30 }],
    ["75 days", ["1200", "75"], { days: 5, amount: 150 }],
    ["150 days", ["1200", "150"], { days: 10, amount: 300 }],
    ["full 300 days", ["1200", "300"], { days: 20, amount: 600 }],
    ["above annual cap", ["1200", "365"], { days: 20, amount: 600 }],
    ["different salary", ["2000", "150"], { days: 10, amount: 500 }],
    ["minimum salary", ["0.01", "300"], { days: 20, amount: 0.005 }],
    ["fractional salary", ["1500.50", "60"], { days: 4, amount: 150.05 }],
    ["comma decimal salary", ["1000,50", "30"], { days: 2, amount: 50.025 }],
  ], ([salary, days]) => calculateLeaveAllowance(salary, days));
});

test("Greeklish: 10 Greeklish-to-Greek and Greek-to-Greeklish examples", async (t) => {
  await examples(t, [
    ["kalimera transliteration", ["kalimera", "toGreek"], "καλιμερα"],
    ["th digraph", ["thelo", "toGreek"], "θελο"],
    ["ps digraph", ["psomi", "toGreek"], "ψομι"],
    ["unknown punctuation preserved", ["kalimera!", "toGreek"], "καλιμερα!"],
    ["uppercase Greeklish normalized", ["KALIMERA", "toGreek"], "καλιμερα"],
    ["Greek to Greeklish", ["καλημέρα", "toGreeklish"], "kalimera"],
    ["final sigma", ["Ελλάς", "toGreeklish"], "ellas"],
    ["Greek psi maps as digraph", ["ψυχή", "toGreeklish"], "psyxi"],
    ["numbers and punctuation preserved", ["abc 123!", "toGreek"], "αβκ 123!"],
    ["accented vowels", ["άέήίόύώ", "toGreeklish"], "aeiioyw"],
  ], ([input, mode]) => convertGreeklish(input, mode));
});

test("Fuel cost: 10 distance, consumption, price and passenger examples", async (t) => {
  await examples(t, [
    ["100 km one passenger", ["100", "6", "2", "1"], { liters: 6, total: 12, perPerson: 12 }],
    ["250 km two passengers", ["250", "6.5", "1.85", "2"], { liters: 16.25, total: 30.0625, perPerson: 15.03125 }],
    ["short trip", ["10", "5", "2", "1"], { liters: 0.5, total: 1, perPerson: 1 }],
    ["four passengers", ["400", "8", "1.5", "4"], { liters: 32, total: 48, perPerson: 12 }],
    ["high consumption", ["100", "20", "1.8", "2"], { liters: 20, total: 36, perPerson: 18 }],
    ["low consumption", ["500", "4", "2", "5"], { liters: 20, total: 40, perPerson: 8 }],
    ["decimal distance", ["125.5", "7.2", "1.9", "3"], { liters: 9.036, total: 17.1684, perPerson: 5.7228 }],
    ["comma decimal input", ["100", "6,5", "2", "2"], { liters: 6.5, total: 13, perPerson: 6.5 }],
    ["1000 km trip", ["1000", "10", "1.5", "10"], { liters: 100, total: 150, perPerson: 15 }],
    ["minimum passengers", ["50", "5", "2", "1"], { liters: 2.5, total: 5, perPerson: 5 }],
  ], ([distance, consumption, price, passengers]) =>
    calculateFuelCost(distance, consumption, price, passengers),
  );
});

test("Moria: 10 four-subject score examples", async (t) => {
  await examples(t, [
    ["all zeroes", ["0", "0", "0", "0"], 0],
    ["all tens", ["10", "10", "10", "10"], 10000],
    ["all twenties", ["20", "20", "20", "20"], 20000],
    ["single top score", ["20", "0", "0", "0"], 5000],
    ["mixed scores", ["10", "12", "14", "16"], 13000],
    ["decimal grades", ["15.5", "16", "17.5", "18"], 16750],
    ["comma decimal grade", ["10,5", "10", "10", "10"], 10125],
    ["all eleven grades", ["11", "11", "11", "11"], 11000],
    ["maximum with low subject", ["20", "20", "20", "0"], 15000],
    ["fractional average", ["10", "11", "12", "13"], 11500],
  ], (grades) => calculateMoria(grades));
});

test("Password generator: 10 option and length examples", async (t) => {
  const options = [
    ["all sets at minimum length", 8, { uppercase: true, lowercase: true, numbers: true, symbols: true }],
    ["uppercase only", 9, { uppercase: true, lowercase: false, numbers: false, symbols: false }],
    ["lowercase only", 10, { uppercase: false, lowercase: true, numbers: false, symbols: false }],
    ["numbers only", 11, { uppercase: false, lowercase: false, numbers: true, symbols: false }],
    ["symbols only", 12, { uppercase: false, lowercase: false, numbers: false, symbols: true }],
    ["uppercase and numbers", 16, { uppercase: true, lowercase: false, numbers: true, symbols: false }],
    ["lowercase and symbols", 24, { uppercase: false, lowercase: true, numbers: false, symbols: true }],
    ["upper and lowercase", 32, { uppercase: true, lowercase: true, numbers: false, symbols: false }],
    ["numbers and symbols", 64, { uppercase: false, lowercase: false, numbers: true, symbols: true }],
    ["three character sets", 20, { uppercase: true, lowercase: true, numbers: true, symbols: false }],
  ];
  const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
  };
  for (const [name, length, selected] of options) {
    await t.test(name, () => {
      const password = generatePassword(length, selected, (array) => {
        for (let index = 0; index < array.length; index++) array[index] = index * 19 + 7;
        return array;
      });
      assert.equal(password.length, length);
      for (const [category, enabled] of Object.entries(selected)) {
        if (enabled) {
          assert.ok(
            [...password].some((character) => characterSets[category].includes(character)),
            `missing ${category} character`,
          );
        }
      }
    });
  }
});

test("Tekmiria: 10 vehicle and home examples", async (t) => {
  await examples(t, [
    ["car at current year, 1000 cc", ["car", "1000", "2026"], 4000],
    ["car threshold 1200 cc", ["car", "1200", "2026"], 4000],
    ["car over 1200 cc", ["car", "1201", "2026"], 6000],
    ["car threshold 2000 cc", ["car", "2000", "2026"], 6000],
    ["car over 2000 cc", ["car", "2001", "2026"], 9000],
    ["car threshold 3000 cc", ["car", "3000", "2026"], 9000],
    ["car over 3000 cc", ["car", "3001", "2026"], 12000],
    ["car minimum depreciation floor", ["car", "1600", "2010"], 1800],
    ["50 square meters", ["home", "", "", "50"], 2000],
    ["125.5 square meters", ["home", "", "", "125.5"], 5020],
  ], ([kind, cc, year, area]) =>
    kind === "car"
      ? calculateCarTekmirio(cc, year, 2026)
      : calculateHomeTekmirio(String(area)),
  );
});

test("Word counter: 10 text-statistics examples", async (t) => {
  await examples(t, [
    ["empty", "", { words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, readingTime: 0 }],
    ["one word", "hello", { words: 1, chars: 5, charsNoSpaces: 5, sentences: 0, paragraphs: 1, readingTime: 1 }],
    ["two words", "hello world", { words: 2, chars: 11, charsNoSpaces: 10, sentences: 0, paragraphs: 1, readingTime: 1 }],
    ["Greek sentence", "Γεια σου.", { words: 2, chars: 9, charsNoSpaces: 8, sentences: 1, paragraphs: 1, readingTime: 1 }],
    ["two sentences", "One. Two!", { words: 2, chars: 9, charsNoSpaces: 8, sentences: 2, paragraphs: 1, readingTime: 1 }],
    ["multiple punctuation groups", "Hi?! Next...", { words: 2, chars: 12, charsNoSpaces: 11, sentences: 2, paragraphs: 1, readingTime: 1 }],
    ["blank line paragraph split", "one\n\ntwo", { words: 2, chars: 8, charsNoSpaces: 6, sentences: 0, paragraphs: 2, readingTime: 1 }],
    ["tabs and spaces", " a\tb c ", { words: 3, chars: 7, charsNoSpaces: 3, sentences: 0, paragraphs: 1, readingTime: 1 }],
    ["Greek multi-word sentence", "πέρα από το μέτρο.", { words: 4, chars: 18, charsNoSpaces: 15, sentences: 1, paragraphs: 1, readingTime: 1 }],
    ["reading time rounds up", `${"word ".repeat(200)}last`, { words: 201, chars: 1004, charsNoSpaces: 804, sentences: 0, paragraphs: 1, readingTime: 2 }],
  ], (text) => countWords(text));
});

test("Input validation rejects malformed values and out-of-range options", async (t) => {
  const invalidNumbers = ["", " ", "12abc", "1,2.3", "Infinity", "NaN", "--1", "1e3", "1,2,3", "."];
  for (const [index, value] of invalidNumbers.entries()) {
    await t.test(`invalid number ${index + 1}`, () =>
      assert.throws(() => calculateDiscount(value, "10")),
    );
  }
  await t.test("invalid VAT rate", () => assert.throws(() => calculateVat("100", 20, "add")));
  await t.test("invalid BMI age", () => assert.throws(() => calculateBmi("70", "170", "20.5", "male")));
  await t.test("invalid service years", () => assert.throws(() => calculateApolysi("1000", "0", "yes")));
  await t.test("invalid leave days", () => assert.throws(() => calculateLeaveAllowance("1000", "366")));
  await t.test("negative loan rate", () => assert.throws(() => calculateLoan("1000", "-1", "10")));
  await t.test("invalid loan term", () => assert.throws(() => calculateLoan("1000", "5", "0")));
  await t.test("not four exam grades", () => assert.throws(() => calculateMoria(["10", "10", "10"])));
  await t.test("no password character sets", () =>
    assert.throws(() => generatePassword(12, {
      uppercase: false, lowercase: false, numbers: false, symbols: false,
    })),
  );
  await t.test("invalid password length", () =>
    assert.throws(() => generatePassword(7, {
      uppercase: true, lowercase: false, numbers: false, symbols: false,
    })),
  );
  await t.test("invalid Greeklish input", () => assert.throws(() => convertGreeklish("   ", "toGreek")));
  await t.test("invalid hire date", () =>
    assert.throws(() => calculateDoro("1000", "2024-02-30", new Date(2024, 11, 31))),
  );
});
