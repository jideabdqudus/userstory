export const generateAccessToken = () => {
  let token = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 100; i++) {
    token += characters.charAt(Math.floor(Math.random() * 100));
  }
  return token;
};

export const getErrorMessages = (array) => {
  let errorText = "";

  for (let errorMsg = 0; errorMsg < array.length; errorMsg++) {
    errorText += `${array[errorMsg].message}\n`;
  }

  return errorText;
};

export const handleApiErrors = (response) => {
  const error = true;

  const errorResponseStatus = (status) => {
    const re = /^[45]\d+$/;
    return re.test(status);
  };

  if (errorResponseStatus(response.status)) {
    if (response.response) {
      if (response.response.data.errors) {
        return response.response.data.errors[0];
      } else if (response.response.statusText) {
        return response.response.statusText;
      } else {
        return error;
      }
    } else if (response.request) {
      return response.request;
    } else if (response.message) {
      return response.message;
    }
  }

  if (typeof response === "undefined") {
    return error;
  }

  if (typeof response.data === "undefined") {
    return error;
  }

  if (response.data.errors) {
    return getErrorMessages(response.data.errors);
  }
};

export const sort = (key, order = "asc") => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

export const sortData = (data, field) => {
  return data.sort((a, b) => (a[field] > b[field] ? 1 : -1));
};

export const filterData = (data, field, value) => {
  return data.filter((item) => item[field] === value);
};

export const isAdmin = (role) => {
  return role.toLowerCase() === "admin";
};

export const titleCase = (str) => {
  if (typeof str === "string") {
    str = str.toLowerCase().split(" ");
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  return str;
};
