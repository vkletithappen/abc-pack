import getAttrNameFromSelector from "./getAttrNameFromSelector";

const getParams = (element, dataAttrSelector) => {
  const data = element.getAttribute(getAttrNameFromSelector(dataAttrSelector));
  if (data) {
    return JSON.parse(data);
  }
}

export default getParams;