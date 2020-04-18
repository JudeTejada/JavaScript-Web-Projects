//https://prime.exchangerate-api.com/v5/8285591c17ad2b4dc8ca4a6a/latest/

//Select Option
const currencyOne = document.getElementById("currencyOne");
const currencyTwo = document.getElementById("currencyTwo");

//input
const amountOne = document.getElementById("amountOne");
const amountTwo = document.getElementById("amountTwo");

const latestConversion = document.getElementById("rate");
const otherConversion = document.getElementById("otherConversion");
//Update and Calculate the latet
const convertRate = () => {
  const currency_two = currencyTwo.value;

  axios
    .get(
      `https://prime.exchangerate-api.com/v5/8285591c17ad2b4dc8ca4a6a/latest/${currencyOne.value}`
    )
    .then((res) => {
      //gets the rate of the currencyTwo
      const rate = res.data.conversion_rates[currency_two];

      //update the content
      latestConversion.innerHTML = `
    <p> <span class="lighten">1 ${currencyOne.value}</span> =   <strong>${rate} ${currency_two}</strong></p>
    `;
      //set the value of  amountTwo Input
      amountTwo.value = (amountOne.value * rate).toFixed(2);

      setConversionOnOtherCurrency(res.data);
    });
};
// calculate when a value is change
currencyOne.addEventListener("change", debounce(convertRate, 600));
currencyTwo.addEventListener("change", debounce(convertRate, 600));

amountOne.addEventListener("input", debounce(convertRate, 600));

const setConversionOnOtherCurrency = (data) => {
  //calculate the conversion
  const php = (amountOne.value * data.conversion_rates["USD"]).toFixed(2);
  const cad = (amountOne.value * data.conversion_rates["CAD"]).toFixed(2);
  const jpy = (amountOne.value * data.conversion_rates["JPY"]).toFixed(2);
  const krw = (amountOne.value * data.conversion_rates["KRW"]).toFixed(2);
  const eur = (amountOne.value * data.conversion_rates["EUR"]).toFixed(2);

  document.querySelector(".conversion").innerHTML = `
    <ul>
        <li>
        <span class="lighten"> ${amountOne.value} ${currencyOne.value}</span> = <span><strong>${php} USD</strong></span>
        </li>
        
        <li>
        <span class="lighten"> ${amountOne.value} ${currencyOne.value}</span> = <span><strong>${cad} CAD</strong></span>
        </li>

        <li>
        <span class="lighten"> ${amountOne.value} ${currencyOne.value}</span> = <span><strong>${jpy} JPY</strong></span>

        </li>

        <li>
        <span class="lighten"> ${amountOne.value} ${currencyOne.value}</span> = <span><strong>${krw} KRW</strong></span>

        </li>

        <li>
        <span class="lighten"> ${amountOne.value} ${currencyOne.value}</span> = <span><strong>${eur} EUR</strong></span>

        </li>
    </ul>
  `;
};

convertRate();
