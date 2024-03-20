import { Notify } from 'notiflix';

Notify.init({
  timeout: 5000,
  clickToClose: true,
});

export const errorHandler = err => {
  Notify.failure(`Error code:${err.code}. Details: ${err}`);
};

export const warningHandler = msg => {
  Notify.warning(msg);
};

export const infoHandler = msg => {
  Notify.info(msg);
};
