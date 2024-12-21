const logRandomString = () => {

    const randomString = Math.random().toString(36).substring(2, 15);
    const currentDate = new Date().toLocaleString();

    console.log(currentDate, randomString);

    setTimeout(logRandomString, 5000);
}

logRandomString();