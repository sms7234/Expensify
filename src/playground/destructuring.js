const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [product, ...prices] = item;

console.log(`A medium ${product} costs ${prices[1]}`)
