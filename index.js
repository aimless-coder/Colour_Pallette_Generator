
const generateButtonEl = document.getElementById("generateButton");

//Generate single random color Hex Code.

const singleHexColorGenerator = () =>{
    const hexCodeArray = [0, 1, 2, 3, 4, 5 , 6 , 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    for(let i = 0; i < 6; i++){
        let random = Math.floor(Math.random() * hexCodeArray.length);
        hexColor += hexCodeArray[random];
    }

    return hexColor;
};

//Create array of 4 random hex code, for color pallette.

const colorPalletteGenerator = () => {
    const colorPallette = [];
    
    for (let i = 0; i < 4; i++) {
        colorPallette.push(singleHexColorGenerator());
    }

    return colorPallette;
}

//Render hex code colors to the webpage.

const renderColorPallette = () =>{
    const colorContainer = document.querySelector(".color-container");
    colorContainer.innerHTML = " ";

    const colorPalletteArray = colorPalletteGenerator(); //New array of color initialized

    colorPalletteArray.forEach((color, i)=>{
        const colorDiv = document.createElement("div"); //Created for each color
        colorDiv.id = `color${i + 1}`;   //started from 1, otherwise it start with 0
        colorDiv.style.background = color;
        colorDiv.className = "color-box";

        //Render color code on left side

        const colorTag = document.createElement("p"); //Created for each color code
        colorTag.id = `color${i + 1}Tag`;
        colorTag.className = "color-tag";
        colorTag.innerHTML = color;

        colorDiv.appendChild(colorTag)
        colorContainer.appendChild(colorDiv);
    });

    //Copy to clipboard feature

    const clickToCopy = (id) =>{
        const idEl = document.getElementById(id);
        navigator.clipboard.writeText(idEl.innerText).then(() => {
            Toastify({
                text: "Copied to clipboard.",
                className: "info",
                style: {
                  background: "green",
                }
              }).showToast();
        }).catch((err) => {
            Toastify({
                text: "Could not copied.",
                className: "info",
                style: {
                  background: "red",
                }
              }).showToast();
        });
    }

    const colorTagsAll = document.querySelectorAll(".color-tag");

    colorTagsAll.forEach((colorTag, i) =>{
        colorTag.addEventListener("click", () => clickToCopy(`color${i + 1}Tag`));
    });

};

renderColorPallette(); //Initial generation of pallette.
generateButtonEl.addEventListener('click', renderColorPallette);