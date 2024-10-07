import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export const getDate = (date?: string | null) => {
  if (!date) return null;
  return moment(date);
};

export const getTodayBR = (format: string = 'DD/MM/YYYY HH:MM') => {
  return moment(new Date()).format(format);
};

export const getTodayEnUs = (format: string = 'YYYY-MM-DD HH:MM') => {
  return moment(new Date()).format(format);
};

export const getFormatDate = (date: string, format: string = 'LLL') => {
  return moment(date).format(format);
};

export const getDateFromNow = (data: string) => {
  return moment(data).fromNow();
};

export const getDateToNow = (data: string) => {
  return moment(data).toNow();
};

export const getDateBR = (date: string) => {
  return moment(date).format('DD/MM/YYYY');
};

export const getDateEnUs = (date: string) => {
  return moment(date).format('YYYY-MM-DD');
};

export const getDayDate = (date: string) => {
  const dateMoment = moment(date);

  return {
    dayNum: dateMoment.date(),
    day: dateMoment.format('dddd'),
    dayWithoutSuffix: dateMoment.format('dddd').replace('-feira', ''),
    dayShort: dateMoment.format('ddd'),
    month: dateMoment.format('MMMM'),
    monthShort: dateMoment.format('MMM'),
    monthNum: dateMoment.month() + 1,
    year: dateMoment.year(),
    hour: dateMoment.format('HH:MM'),
  };
};

export const getQuarterDate = (date: string) => {
  const dateMoment = moment(date);
  const quarter = dateMoment.quarter();
  const year = dateMoment.year();
  return {
    quarter,
    year,
  };
};

export const getDateAddDays = (
  date: string,
  days: number = 1,
  format: string = 'DD/MM/YYYY'
) => {
  const dateMoment = moment(date);
  dateMoment.add(days, 'days');
  return dateMoment.format(format);
};

export const getDateAddMonths = (
  date: string,
  months: number = 1,
  format: string = 'DD/MM/YYYY'
) => {
  const dateMoment = moment(date);
  dateMoment.add(months, 'months');
  return dateMoment.format(format);
};

export const getDateAddHours = (
  date: string,
  hours: number = 1,
  format: string = 'DD/MM/YYYY [às] HH:MM'
) => {
  const dateMoment = moment(date);
  dateMoment.add(hours, 'hours');
  return dateMoment.format(format);
};

export const getDateAddMinutes = (
  date: string,
  minutes: number = 1,
  format: string = 'DD/MM/YYYY [às] HH:MM'
) => {
  const dateMoment = moment(date);
  dateMoment.add(minutes, 'minutes');
  return dateMoment.format(format);
};

export const getDateAddYers = (
  date: string,
  years: number = 1,
  format: string = 'DD/MM/YYYY [às] HH:MM'
) => {
  const dateMoment = moment(date);
  dateMoment.add(years, 'years');
  return dateMoment.format(format);
};

export type GetDayToEnForPtBr =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sun'
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat';

export const getDayToEnForPtBr = (day: GetDayToEnForPtBr): string => {
  const dayMappings: Record<string, string> = {
    sunday: 'Domingo',
    monday: 'Segunda',
    tuesday: 'Terça',
    wednesday: 'Quarta',
    thursday: 'Quinta',
    friday: 'Sexta',
    saturday: 'Sábado',
    sun: 'Domingo',
    mon: 'Segunda',
    tue: 'Terça',
    wed: 'Quarta',
    thu: 'Quinta',
    fri: 'Sexta',
    sat: 'Sábado',
  };

  const dayLowerCase = day.toLowerCase();
  return dayMappings[dayLowerCase] || 'Dia inválido';
};

export const isDate = (date: string | null | undefined): boolean => {
  if (!date || typeof date !== 'string') {
    return false;
  }
  return moment(date, ['LLL', 'L', 'DD/MM/YYYY'], true).isValid();
};

export const getUnixTime = (date: string | null | undefined) => {
  if (!date || !moment(date).isValid()) {
    return null;
  }

  return moment(date).unix();
};

export const getIsoDate = (date: string | null | undefined) => {
  if (!date || !moment(date).isValid()) {
    return null;
  }

  return moment(date).toISOString();
};
