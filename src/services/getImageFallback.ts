/**
 * creates image fallback should it be needed
 * @param currentTarget
 * @param id
 */
export const getImageFallback = (currentTarget: EventTarget & HTMLImageElement,id: string | number|undefined) => {
  //@ts-ignore
  currentTarget.onError=null; //prevents infinite looping
  switch (id) {
  case '1':
    currentTarget.src= process.env.PUBLIC_URL + '/img/pikachu.png';
    break;
  case '2':
    currentTarget.src= process.env.PUBLIC_URL + '/img/charizard.png';
    break;
  case '3':
    currentTarget.src= process.env.PUBLIC_URL + '/img/cat.png';
    break;
  default:
    currentTarget.src= process.env.PUBLIC_URL + '/img/fallback.png';
    break;
  }
};