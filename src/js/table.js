document.addEventListener('DOMContentLoaded', () => {
    const merchForm = document.querySelector('#merchForm');
    const generatedTable = document.querySelector('#generatedTable');

    const productsData = [
        {
            "merchType": "Postcard",
            "designType": "Custom",
            "collection": "New Autumn",
            "productName": "Postcard A5 'Autumn Centaur'",
            "imagePath": "images/gallery/autumn4.jpg"
        },
        {
            "merchType": "Postcard",
            "designType": "Custom",
            "collection": "New Autumn",
            "productName": "Postcard A5 'Pastoral Landscape'",
            "imagePath": "images/gallery/autumn1.jpg"
        },
        {
            "merchType": "Pin",
            "designType": "Classic",
            "collection": "Forest Vibes",
            "productName": "Pin 37mm 'Shadows Of Foliage'",
            "imagePath": "images/pin.png"
        },
        {
            "merchType": "Shopper",
            "designType": "Classic",
            "collection": "Classic",
            "productName": "Shopper 'Voice Of Heaven'",
            "imagePath": "images/shopper.png"
        },
        {
            "merchType": "Poster",
            "designType": "Classic",
            "collection": "Forest Vibes",
            "productName": "Poster A4 'How It All Began'",
            "imagePath": "images/welcome.jpeg"
        }
    ];
    loadFormData();

    merchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const merchType = getCheckedValues('merchType');
        const designType = getCheckedValues('designType');
        const collectionType = getCheckedValues('collectionType');
        localStorage.setItem('merchFormData', JSON.stringify({ merchType, designType, collectionType }));
        generateTable({ merchType, designType, collectionType });
    });

    function getCheckedValues(name) {
        return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(cb => cb.value);
    }

    function generateTable({ merchType, designType, collectionType }) {

        generatedTable.innerHTML = `
            <tr>
                <th>Merch Type</th>
                <th>Design Type</th>
                <th>Collection</th>
                <th>Product</th>
                <th>Image</th>
            </tr>`;

        const filteredData = productsData.filter(product =>
            (!merchType.length || merchType.includes(product.merchType)) &&
            (!designType.length || designType.includes(product.designType)) &&
            (!collectionType.length || collectionType.includes(product.collection))
        );

        if (filteredData.length === 0) {
            generatedTable.innerHTML += '<tr><td colspan="5">No matching items. Try selecting again</td></tr>';
            return;
        }

        filteredData.forEach(product => {
            const tableRow = `
                <tr>
                    <td>${product.merchType}</td>
                    <td>${product.designType}</td>
                    <td>${product.collection}</td>
                    <td>${product.productName}</td>
                    <td><img src="${product.imagePath}" alt="${product.productName}" class="product-image"></td>
                </tr>`;
            generatedTable.innerHTML += tableRow;
        });
    }

    function loadFormData() {
        const savedData = localStorage.getItem('merchFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            setCheckedValues('merchType', formData.merchType);
            setCheckedValues('designType', formData.designType);
            setCheckedValues('collectionType', formData.collectionType);
            generateTable(formData);
        }
    }

    function setCheckedValues(name, values) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]`);
        checkboxes.forEach(checkbox => {
            checkbox.checked = values.includes(checkbox.value);
        });
    }
});