// Preenchimento dos Select's

function dataSelect(select, url) {
  fetch(url)
  .then( res => res.json())
  .then( dados => {
    for (const dado of dados) {
      select.innerHTML += `<option value="${dado.id}">${dado.nome}</option>`
    }
  });
}

function populateUFs() {
  const ufSelect = document.querySelector('select[class=uf]');
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
  dataSelect(ufSelect, url)
}

populateUFs()

function getCities(e) {
  const citySelect = document.querySelector('select[class=city]');
  const ufInput = document.querySelector('input[name=uf]');

  const ufValue = e.target.value;
  const indexOfSelectedState = e.target.selectedIndex;
  ufInput.value = e.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`;
  citySelect.disabled = true;
  dataSelect(citySelect, url);
  citySelect.disabled = false;
}

document
  .querySelector('select[class=uf]')
  .addEventListener("change", getCities);

document
  .querySelector('select[class=city]')
  .addEventListener("change", (e) => {
    const cityInput = document.querySelector('input[name=city]');

    const indexOfSelectedCity = e.target.selectedIndex;
    cityInput.value = e.target.options[indexOfSelectedCity].text;
  });

// Itens de coleta - class="selected"

const itemsToCollect = document.querySelectorAll('.items-grid li');

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

let selectedItems = Array();
const inputValues = document.querySelector('input[name=items]');

function handleSelectedItem(e) {
  e.target.classList.toggle("selected");
  const itemId = e.target.dataset.id;
  const index = selectedItems.indexOf(itemId);
  const alreadySelected = index in selectedItems
   
  if (alreadySelected) 
    selectedItems.splice(index, 1);
  else
    selectedItems.push(itemId);

  inputValues.value = selectedItems
}