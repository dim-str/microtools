type NumberOptions = {
  min?: number;
  max?: number;
  integer?: boolean;
};

export function parseToolNumber(
  value: string,
  label: string,
  { min, max, integer = false }: NumberOptions = {},
): number {
  const normalized = value.trim().replace(",", ".");
  if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(normalized)) {
    throw new Error(`Συμπληρώστε έγκυρη τιμή για: ${label}.`);
  }

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Συμπληρώστε έγκυρη τιμή για: ${label}.`);
  }
  if (integer && !Number.isInteger(parsed)) {
    throw new Error(`Η τιμή για «${label}» πρέπει να είναι ακέραιος αριθμός.`);
  }
  if (min !== undefined && parsed < min) {
    throw new Error(`Η τιμή για «${label}» πρέπει να είναι τουλάχιστον ${min}.`);
  }
  if (max !== undefined && parsed > max) {
    throw new Error(`Η τιμή για «${label}» δεν πρέπει να ξεπερνά το ${max}.`);
  }

  return parsed;
}

export function calculateApolysi(
  salary: string,
  years: string,
  notice: "yes" | "no",
) {
  const monthlySalary = parseToolNumber(salary, "Μικτός μηνιαίος μισθός", { min: 0.01 });
  const serviceYears = parseToolNumber(years, "Έτη προϋπηρεσίας", {
    min: 1,
    max: 60,
    integer: true,
  });
  const months = Math.min(serviceYears, 24) * (notice === "no" ? 1.5 : 1);
  return { months, amount: monthlySalary * months };
}

const units = ["", "ένα", "δύο", "τρία", "τέσσερα", "πέντε", "έξι", "επτά", "οκτώ", "εννέα"];
const teens = ["δέκα", "έντεκα", "δώδεκα", "δεκατρία", "δεκατέσσερα", "δεκαπέντε", "δεκαέξι", "δεκαεπτά", "δεκαοκτώ", "δεκαεννέα"];
const tens = ["", "", "είκοσι", "τριάντα", "σαράντα", "πενήντα", "εξήντα", "εβδομήντα", "ογδόντα", "ενενήντα"];
const hundreds = ["", "εκατό", "διακόσια", "τριακόσια", "τετρακόσια", "πεντακόσια", "εξακόσια", "επτακόσια", "οκτακόσια", "εννιακόσια"];

function numberToGreekWords(num: number): string {
  if (num === 0) return "μηδέν";

  const convertBelow1000 = (value: number): string => {
    if (value === 0) return "";
    const hundred = Math.floor(value / 100);
    const remainder = value % 100;
    const parts: string[] = [];

    if (hundred > 0) parts.push(hundreds[hundred]);
    if (remainder >= 10 && remainder < 20) {
      parts.push(teens[remainder - 10]);
    } else if (remainder >= 20) {
      parts.push(tens[Math.floor(remainder / 10)]);
      if (remainder % 10 > 0) parts.push(units[remainder % 10]);
    } else if (remainder > 0) {
      parts.push(units[remainder]);
    }

    return parts.join(" ");
  };

  const convertThousands = (value: number): string => {
    if (value < 1000) return convertBelow1000(value);
    if (value < 1_000_000) {
      const thousandsValue = Math.floor(value / 1000);
      const remainder = value % 1000;
      const prefix = thousandsValue === 1
        ? "χίλια"
        : `${convertBelow1000(thousandsValue)} χιλιάδες`;
      return remainder > 0 ? `${prefix} ${convertBelow1000(remainder)}` : prefix;
    }

    const millions = Math.floor(value / 1_000_000);
    const remainder = value % 1_000_000;
    const prefix = millions === 1
      ? "ένα εκατομμύριο"
      : `${convertBelow1000(millions)} εκατομμύρια`;
    return remainder > 0 ? `${prefix} ${convertThousands(remainder)}` : prefix;
  };

  return convertThousands(num);
}

export function amountInGreekWords(value: string): string {
  const amount = parseToolNumber(value, "Ποσό", { min: 0, max: 999_999_999.99 });
  const centsTotal = Math.round(amount * 100);
  const euros = Math.floor(centsTotal / 100);
  const cents = centsTotal % 100;
  let result = `${numberToGreekWords(euros)} ευρώ`;
  if (cents > 0) result += ` και ${numberToGreekWords(cents)} λεπτά`;
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function calculateBmi(
  weight: string,
  height: string,
  age: string,
  gender: "male" | "female",
) {
  const weightKg = parseToolNumber(weight, "Βάρος", { min: 0.1, max: 500 });
  const heightCm = parseToolNumber(height, "Ύψος", { min: 30, max: 300 });
  const ageYears = parseToolNumber(age, "Ηλικία", { min: 1, max: 120, integer: true });
  const bmi = weightKg / ((heightCm / 100) ** 2);
  const category = bmi < 18.5
    ? "Ελλιποβαρής"
    : bmi < 25
      ? "Φυσιολογικό βάρος"
      : bmi < 30
        ? "Υπέρβαρος"
        : "Παχυσαρκία";
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + (gender === "male" ? 5 : -161);
  return { bmi, category, bmr };
}

export function calculateVat(
  amount: string,
  rate: number,
  mode: "add" | "remove",
) {
  const value = parseToolNumber(amount, "Ποσό", { min: 0, max: 1_000_000_000 });
  if (![6, 13, 24].includes(rate)) throw new Error("Επιλέξτε έγκυρο συντελεστή ΦΠΑ.");

  if (mode === "add") {
    const vat = value * rate / 100;
    return { net: value, vat, total: value + vat };
  }

  const net = value / (1 + rate / 100);
  return { net, vat: value - net, total: value };
}

export function calculateDoro(
  salary: string,
  hireDate: string,
  now: Date = new Date(),
) {
  const monthlySalary = parseToolNumber(salary, "Μικτός μηνιαίος μισθός", { min: 0.01 });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(hireDate)) {
    throw new Error("Εισάγετε έγκυρη ημερομηνία πρόσληψης.");
  }

  const [year, month, day] = hireDate.split("-").map(Number);
  const hire = new Date(year, month - 1, day);
  if (
    hire.getFullYear() !== year ||
    hire.getMonth() !== month - 1 ||
    hire.getDate() !== day
  ) {
    throw new Error("Εισάγετε έγκυρη ημερομηνία πρόσληψης.");
  }
  if (hire > now) throw new Error("Η ημερομηνία πρόσληψης δεν μπορεί να είναι μελλοντική.");

  const isEasterPeriod = now.getMonth() < 4;
  const periodStart = Date.UTC(
    now.getFullYear(),
    isEasterPeriod ? 0 : 4,
    1,
  );
  const periodEnd = Date.UTC(
    now.getFullYear(),
    isEasterPeriod ? 3 : 11,
    isEasterPeriod ? 30 : 31,
  );
  const hireUtc = Date.UTC(year, month - 1, day);
  const start = Math.max(periodStart, hireUtc);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const days = Math.max(0, Math.floor((periodEnd - start) / millisecondsPerDay) + 1);
  const periodDays = Math.floor((periodEnd - periodStart) / millisecondsPerDay) + 1;
  const ratio = Math.min(days / periodDays, 1);
  const giftAmount = monthlySalary * ratio * (isEasterPeriod ? 0.5 : 1);

  return {
    doro: giftAmount,
    days,
    ratio,
    type: isEasterPeriod ? "Δώρο Πάσχα" : "Δώρο Χριστουγέννων",
  };
}

export function calculateDiscount(price: string, discount: string) {
  const originalPrice = parseToolNumber(price, "Αρχική τιμή", {
    min: 0,
    max: 1_000_000_000,
  });
  const percent = parseToolNumber(discount, "Ποσοστό έκπτωσης", { min: 0, max: 100 });
  const saved = originalPrice * percent / 100;
  return { final: originalPrice - saved, saved };
}

export function calculateLeaveAllowance(salary: string, daysWorked: string) {
  const monthlySalary = parseToolNumber(salary, "Μικτός μηνιαίος μισθός", { min: 0.01 });
  const days = parseToolNumber(daysWorked, "Ημέρες εργασίας", {
    min: 1,
    max: 365,
    integer: true,
  });
  const ratio = Math.min(days / 300, 1);
  return {
    days: Math.floor(20 * ratio),
    amount: monthlySalary / 2 * ratio,
  };
}

export function calculateFuelCost(
  distance: string,
  consumption: string,
  price: string,
  passengers: string,
) {
  const distanceKm = parseToolNumber(distance, "Απόσταση", { min: 0.1, max: 1_000_000 });
  const consumptionPer100Km = parseToolNumber(consumption, "Κατανάλωση", {
    min: 0.1,
    max: 100,
  });
  const fuelPrice = parseToolNumber(price, "Τιμή καυσίμου", { min: 0.01, max: 1000 });
  const passengerCount = parseToolNumber(passengers, "Επιβάτες", {
    min: 1,
    max: 100,
    integer: true,
  });
  const liters = distanceKm / 100 * consumptionPer100Km;
  const total = liters * fuelPrice;
  return { liters, total, perPerson: total / passengerCount };
}

export function calculateMoria(grades: readonly string[]) {
  if (grades.length !== 4) throw new Error("Συμπληρώστε ακριβώς τέσσερις βαθμούς.");
  const values = grades.map((grade, index) =>
    parseToolNumber(grade, `Βαθμός μαθήματος ${index + 1}`, { min: 0, max: 20 }),
  );
  return values.reduce((sum, grade) => sum + grade, 0) / 4 * 1000;
}

export function calculateLoan(principal: string, annualRate: string, years: string) {
  const amount = parseToolNumber(principal, "Ποσό δανείου", {
    min: 0.01,
    max: 1_000_000_000,
  });
  const ratePercent = parseToolNumber(annualRate, "Ετήσιο επιτόκιο", {
    min: 0,
    max: 100,
  });
  const termYears = parseToolNumber(years, "Διάρκεια δανείου", {
    min: 1,
    max: 50,
    integer: true,
  });
  const months = termYears * 12;
  const monthlyRate = ratePercent / 1200;
  const monthlyPayment = monthlyRate === 0
    ? amount / months
    : amount * monthlyRate / (1 - (1 + monthlyRate) ** -months);
  const totalPayment = monthlyPayment * months;
  return { monthlyPayment, totalPayment, totalInterest: totalPayment - amount };
}

export type PasswordOptions = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

const passwordPools: Record<keyof PasswordOptions, string> = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

export function generatePassword(
  length: number,
  options: PasswordOptions,
  fillRandom: (array: Uint32Array) => Uint32Array = (array) =>
    globalThis.crypto.getRandomValues(array),
): string {
  if (!Number.isInteger(length) || length < 8 || length > 64) {
    throw new Error("Το μήκος του κωδικού πρέπει να είναι από 8 έως 64 χαρακτήρες.");
  }
  const pools = Object.entries(passwordPools)
    .filter(([key]) => options[key as keyof PasswordOptions])
    .map(([, pool]) => pool);
  if (pools.length === 0) throw new Error("Επιλέξτε τουλάχιστον έναν τύπο χαρακτήρων.");

  const allCharacters = pools.join("");
  const randomValues = fillRandom(new Uint32Array(length * 2));
  const characters = pools.map((pool, index) =>
    pool[randomValues[index] % pool.length],
  );
  for (let index = characters.length; index < length; index++) {
    characters.push(allCharacters[randomValues[index] % allCharacters.length]);
  }
  for (let index = characters.length - 1; index > 0; index--) {
    const swapIndex = randomValues[length + index] % (index + 1);
    [characters[index], characters[swapIndex]] = [characters[swapIndex], characters[index]];
  }
  return characters.join("");
}

export function calculateCarTekmirio(
  cc: string,
  year: string,
  currentYear: number = new Date().getFullYear(),
): number {
  const cubicCapacity = parseToolNumber(cc, "Κυβικά", {
    min: 1,
    max: 20_000,
    integer: true,
  });
  const registrationYear = parseToolNumber(year, "Έτος κυκλοφορίας", {
    min: 1900,
    max: currentYear,
    integer: true,
  });
  const base = cubicCapacity <= 1200
    ? 4000
    : cubicCapacity <= 2000
      ? 6000
      : cubicCapacity <= 3000
        ? 9000
        : 12000;
  const depreciation = Math.max(0.3, 1 - (currentYear - registrationYear) * 0.1);
  return base * depreciation;
}

export function calculateHomeTekmirio(squareMeters: string): number {
  const area = parseToolNumber(squareMeters, "Τετραγωνικά μέτρα", {
    min: 0.1,
    max: 1_000_000,
  });
  return area * 40;
}

export function convertGreeklish(
  input: string,
  mode: "toGreek" | "toGreeklish",
): string {
  if (!input.trim()) throw new Error("Συμπληρώστε κείμενο για μετατροπή.");
  const greekToGreeklish: Record<string, string> = {
    "α": "a", "β": "v", "γ": "g", "δ": "d", "ε": "e", "ζ": "z", "η": "i", "θ": "th",
    "ι": "i", "κ": "k", "λ": "l", "μ": "m", "ν": "n", "ξ": "x", "ο": "o", "π": "p",
    "ρ": "r", "σ": "s", "ς": "s", "τ": "t", "υ": "y", "φ": "f", "χ": "x", "ψ": "ps",
    "ω": "w", "ά": "a", "έ": "e", "ή": "i", "ί": "i", "ό": "o", "ύ": "y", "ώ": "w",
    "ϊ": "i", "ϋ": "y", "ΐ": "i", "ΰ": "y",
  };
  const greeklishToGreek: Record<string, string> = {
    "a": "α", "b": "β", "v": "β", "g": "γ", "d": "δ", "e": "ε", "z": "ζ", "h": "η",
    "i": "ι", "k": "κ", "l": "λ", "m": "μ", "n": "ν", "x": "ξ", "o": "ο", "p": "π",
    "r": "ρ", "s": "σ", "t": "τ", "y": "υ", "f": "φ", "c": "κ", "u": "υ", "w": "ω",
    "th": "θ", "ps": "ψ",
  };
  const text = input.toLowerCase();
  if (mode === "toGreeklish") {
    return [...text].map((character) => greekToGreeklish[character] || character).join("");
  }

  let result = "";
  for (let index = 0; index < text.length; index++) {
    const digraph = text.slice(index, index + 2);
    if (greeklishToGreek[digraph]) {
      result += greeklishToGreek[digraph];
      index++;
    } else {
      result += greeklishToGreek[text[index]] || text[index];
    }
  }
  return result;
}

export function isValidAfm(value: string): boolean {
  if (!/^\d{9}$/.test(value)) return false;
  let sum = 0;
  for (let index = 0; index < 8; index++) {
    sum += Number(value[index]) * 2 ** (8 - index);
  }
  return sum % 11 % 10 === Number(value[8]);
}

export function isValidAmka(
  value: string,
  currentYear: number = new Date().getFullYear(),
): boolean {
  if (!/^\d{11}$/.test(value)) return false;
  const day = Number(value.slice(0, 2));
  const month = Number(value.slice(2, 4));
  const year = Number(value.slice(4, 8));
  if (year < 1900 || year > currentYear) return false;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function countWords(text: string) {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  return {
    words,
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, "").length,
    sentences: (text.match(/[.!?]+/g) || []).length,
    paragraphs: trimmed ? trimmed.split(/\n{2,}/).length : 0,
    readingTime: Math.ceil(words / 200),
  };
}
