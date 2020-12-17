import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function timeStampConvert(stamp) {
  const date = new Date(stamp);
  return date.toLocaleDateString('ch-TW') + ' ' + date.toLocaleTimeString('ch-TW')
}

export {useQuery, timeStampConvert}