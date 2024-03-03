// fetchImages.js

const fullData = require('./full.json');

const fetchImages = (classList, augList, levelList) => {
    const filteredImages = [];
    if (augList.includes(0)) {
        levelList.push(0); // Ensure level 0 is included when augList includes original images
    }
    console.log(classList, augList, levelList);
    // Iterate through each image in the data
    fullData.data.forEach(image => {
        // Check if the image meets the filtering criteria
        if (
            classList.includes(image.c) &&
            augList.includes(image.a) &&
            levelList.includes(image.l)
        ) {
            // If it meets the criteria, add an object with all the metadata and the file path to the filteredImages array
            const imageMetadata = {
                classId: image.c,
                augId: image.a,
                aug_level: image.l,
                setting_id: image.s,
                image_id: image.i,
                filePath: fullData.mappings.id_to_img_path[image.i] // Include the file path using the image id
            };
            filteredImages.push(imageMetadata);
        }
    });
    return filteredImages;
}


function fetchOriginalClassImages(imageMetadata) {
    // Filter images belonging to the same class but with augId=0 and aug_level=0
    return fullData.data.filter(image => 
        image.c === imageMetadata.classId && image.a === 0 && image.l === 0
    ).map(image => ({
        classId: image.c,
        augId: image.a,
        aug_level: image.l,
        setting_id: image.s,
        image_id: image.i,
        filePath: fullData.mappings.id_to_img_path[image.i] // Include the file path using the image id
    }));
}

function fetchDifferentAugVariantsOfCurrentImage(imageMetadata) {
    // First, extract the file name from the file path
    const fileName = extractFileName(imageMetadata.filePath);

    // Filter images with the same class and aug_level=3, and check if the file name matches
    return fullData.data.filter(image => 
        image.c === imageMetadata.classId && image.l === 3 &&
        extractFileName(fullData.mappings.id_to_img_path[image.i]) === fileName
    ).map(image => ({
        classId: image.c,
        augId: image.a,
        aug_level: image.l,
        setting_id: image.s,
        image_id: image.i,
        filePath: fullData.mappings.id_to_img_path[image.i] // Include the file path using the image id
    }));
}

function fetchDifferentAugLevelVariantsOfCurrentImage(imageMetadata) {
    // Extract file name from the input image's path for comparison
    const fileName = extractFileName(imageMetadata.filePath);

    // Filter images with the same file name and aug_id but different aug_levels
    return fullData.data.filter(image =>
        image.a === imageMetadata.augId &&
        extractFileName(fullData.mappings.id_to_img_path[image.i]) === fileName
    ).map(image => ({
        classId: image.c,
        augId: image.a,
        aug_level: image.l,
        setting_id: image.s,
        image_id: image.i,
        filePath: fullData.mappings.id_to_img_path[image.i] // Include the file path using the image id
    }));
}

function extractFileName(filePath) {
    return filePath.split('/').pop().split('.')[0]; // Extracting the file name without extension
}
// Ensure to include these functions in your module exports
export {
    fetchImages,
    fetchOriginalClassImages,
    fetchDifferentAugVariantsOfCurrentImage,
    fetchDifferentAugLevelVariantsOfCurrentImage
}
// or for commonJS
// module.exports = fetchImages;