import { format } from "date-fns";

export class LocaleService {
  private static instance: LocaleService;

  private readonly locale: string;

  private constructor() {
    this.locale = navigator.language || "en-US";
  }

  public static getInstance(): LocaleService {
    if (!LocaleService.instance) {
      LocaleService.instance = new LocaleService();
    }
    return LocaleService.instance;
  }

  public formatDate(date: Date, pattern: string = "MM/dd/yyyy HH:mm:ss"): string {
    return format(date, pattern);
  }

  public formatNumericDate(date: Date): string {
    return date.toLocaleDateString(this.locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
}
