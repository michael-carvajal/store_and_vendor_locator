let tables = document.querySelectorAll("#table tr"); // had to add my own id attribute to select element

// Interface {
//     name,
//     address,
// city,
// state,
// zip,
// county,
// phone
// }
const storeMap = {};

for (let i = 1; i < tables.length; i++) {
  //tables.slice(1)
  const row = tables[i];
  const children = row.children;
  let storeNumber;
  storeNumber = children[0].innerText.split("-")[0].trim();
  storeMap[storeNumber] = {};
  storeMap[storeNumber].name = children[0].innerText;
  storeMap[storeNumber].address = children[1].innerText;
  storeMap[storeNumber].city = children[2].innerText;
  storeMap[storeNumber].state = children[3].innerText;
  storeMap[storeNumber].zip = children[4].innerText;
  storeMap[storeNumber].county = children[5].innerText;
  storeMap[storeNumber].phone = children[6].innerText;
}

console.log(storeMap);
