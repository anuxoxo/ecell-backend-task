function handleFocus() {
    // element.classList.add("mystyle");
    const element = document.querySelectorAll(".form-floating");
    element.forEach(i => {
        i.style.display = "block";
    });
}

const deleteCourse = (id) => {
    // const url = '/' + id;
    // console.log(url);
    // try {
    //     const response = await fetch(url, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         body: JSON.stringify(data) // body data type must match "Content-Type" header
    //     });
    //     console.log(response);
    // } catch (err) {
    //     res.send(err.message);
    // }
    console.log(id);
}