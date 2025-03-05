//your code here
document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("flex");
    document.body.prepend(imageContainer);

    const images = [
        "https://picsum.photos/id/237/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/200/300?grayscale",
        "https://picsum.photos/200/300/",
        "https://picsum.photos/200/300.jpg"
    ];
    
    let duplicateImage = images[Math.floor(Math.random() * images.length)];
    let imageSet = [...images, duplicateImage];
    imageSet = imageSet.sort(() => Math.random() - 0.5);

    let selectedImages = [];

    const message = document.createElement("h3");
    message.id = "h";
    message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
    document.body.prepend(message);

    const resultMessage = document.createElement("p");
    resultMessage.id = "para";
    document.body.appendChild(resultMessage);

    const resetButton = document.createElement("button");
    resetButton.id = "reset";
    resetButton.textContent = "Reset";
    resetButton.style.display = "none";
    document.body.appendChild(resetButton);

    const verifyButton = document.createElement("button");
    verifyButton.id = "verify";
    verifyButton.textContent = "Verify";
    verifyButton.style.display = "none";
    document.body.appendChild(verifyButton);

    imageSet.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.dataset.index = index;
        img.addEventListener("click", () => selectImage(img));
        imageContainer.appendChild(img);
    });

    function selectImage(img) {
        if (selectedImages.length < 2 && !selectedImages.includes(img)) {
            img.classList.add("selected");
            selectedImages.push(img);
        }

        if (selectedImages.length > 0) {
            resetButton.style.display = "block";
        }
        
        if (selectedImages.length === 2) {
            verifyButton.style.display = "block";
        }
    }

    resetButton.addEventListener("click", () => {
        selectedImages.forEach(img => img.classList.remove("selected"));
        selectedImages = [];
        resetButton.style.display = "none";
        verifyButton.style.display = "none";
        resultMessage.textContent = "";
    });

    verifyButton.addEventListener("click", () => {
        verifyButton.style.display = "none";
        if (selectedImages[0].src === selectedImages[1].src) {
            resultMessage.textContent = "You are a human. Congratulations!";
        } else {
            resultMessage.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }
    });
});
