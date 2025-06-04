import { filter, Observable } from "rxjs";
import { FiscalPeriod } from "../fiscal-periods/fiscal-periods.types";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export const pipePeriod = (period$: Observable<FiscalPeriod | null>) => {
  return period$.pipe(
      takeUntilDestroyed(),
      filter(x => x !== null));
}

export const onPeriodSelect = (period$: Observable<FiscalPeriod | null>, callback: (period: FiscalPeriod) => void) => {
    pipePeriod(period$).subscribe(callback)
}

export const currency = (x: any) => x < 0 
  ? `-€${(-x)?.toLocaleString() ?? '0'}`
  : `€${(x)?.toLocaleString() ?? '0'}`