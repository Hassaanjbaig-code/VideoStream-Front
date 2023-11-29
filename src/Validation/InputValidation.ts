interface validateEmail {
  isValid: boolean;
  err: string;
}

export function validationEmail(value: string): validateEmail {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value.length <= 1) {
    return {
      isValid: true,
      err: `Please write an Email`,
    };
  }
  if (!emailRegex.test(value)) {
    return {
      isValid: true,
      err: "Invalid Email Format",
    };
  }
  return {
    isValid: false,
    err: "",
  };
}

export function validImage(value: File): validateEmail {
  const supportedFile = ["jpg", "png", "jpeg"];
  let fileArrey = value.type.split("")
  let find = fileArrey.indexOf("/")

  let sliceArray = fileArrey.slice(find + 1).join("")
  if(!supportedFile.includes(sliceArray)){
    return {
      isValid: true,
      err: "Image should be jpg, png, jpeg"
    }
  }
  return {
    isValid: false,
    err: ""
  }
}

export function validateVideo(value:File): validateEmail {
  const supportedFile = ["mkv", "mp4"]
  let makeFileArray = value.type.split("")
  let find = makeFileArray.indexOf("/")
  let sliceArray = makeFileArray.slice(find + 1).join("")
  if (!supportedFile.includes(sliceArray)) {
    return {
      isValid: true,
      err: "Video should be mkv, mp4"
    }
  }

  return {
    isValid: false,
    err: ""
  }
}

export function validatePassword(
  value: string,
  minLength: number = 8
): validateEmail {
  let hasMinLength = false;
  let hasUpper = false;
  let hasLower = false;
  let hasSpecialChar = false;
  let hasNumber = false;

  if (value.length >= minLength) {
    hasMinLength = true;
  }

  for (let char of value) {
    if (char.match(/[A-Z]/)) {
      hasUpper = true;
    } else if (char.match(/[a-z]/)) {
      hasLower = true;
    } else if (char.match(/[0-9]/)) {
      hasNumber = true;
    } else if (char.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) {
      hasSpecialChar = true;
    }
  }

  if (!hasMinLength) {
    return {
      isValid: true,
      err: "Password must have at least 8 characters",
    };
  }

  if (!(hasUpper && hasLower && hasNumber && hasSpecialChar)) {
    return {
      isValid: true,
      err: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
    };
  }

  // If all validation checks pass, return a valid result
  return {
    isValid: false,
    err: "",
  };
}

export function validateName(
  value: string,
  minLenght: number = 2
): validateEmail {
  if (value.length <= minLenght) {
    return {
      isValid: true,
      err: `Name should be ${minLenght} Long`,
    };
  }

  if (!/^[a-zA-Z ]*$/.test(value)) {
    return {
      isValid: true,
      err: "Name should not have number",
    };
  }

  return {
    isValid: false,
    err: "",
  };
}

export function validateTitle(
  value: string,
  minLenght: number = 2
): validateEmail {
  if (value.length <= minLenght) {
    return {
      isValid: true,
      err: "Please Fill the Form",
    };
  }
  return {
    isValid: false,
    err: "",
  };
}

export function validateDes(
  value: string,
  minLenght: number = 2,
  maxLength: number = 255
) {
  if (value.length <= minLenght) {
    return {
      isValid: true,
      err: "Please Fill the Field",
    };
  }
  if (value.length >= maxLength) {
    return {
      isValid: true,
      err: `Not more than ${maxLength}`,
    };
  }

  return {
    isValid: false,
    err: "",
  };
}
