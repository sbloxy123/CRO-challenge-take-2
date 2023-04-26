//== listen for #add-to-cart-button creation to reduce delay ==//
window.addEventListener("load", () => {
  // after element found, call function to create CTA
  waitForElm("#add-to-cart-button").then(createCta());
});

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    // setup the observer
    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });
    // observe the page for the change(creation)
    const container = document.documentElement || document.body;
    observer.observe(container, {
      childList: true,
      subtree: true,
    });
  });
}

function createCta() {
  // getting the max quantity permitted
  const amazonsDropdown = document.querySelector("#mobileQuantityDropDown");
  const totalOptionsAvailable =
    amazonsDropdown.querySelectorAll("option").length;
  // selecting where to place CTA
  const CTA = document.createElement("div");
  // building the CTA:
  const ctaForm = document.createElement("div");
  ctaForm.innerHTML = `
  <form id="myCTA-form">
    <input id="CTA-quantity" type="number" value="1" min="1" max="${totalOptionsAvailable}" />
    <button id="CTA-button" type="submit">Add To Basket</button>
  </form>
`;
  CTA.append(ctaForm);
  CTA.classList.add("show");

  addCtaToPage(CTA);
}

//==== adding CTA to page & setting its visibility ====//

function addCtaToPage(CTA) {
  const CTAPlacement = document.querySelector("#a-page");
  CTAPlacement.insertAdjacentElement("afterend", CTA);

  let options = {
    root: null, //null = defaults to the users viewport
    rootMargin: "0px",
    threshold: 0.3,
  };

  // map through array of entries provided & setting element(observer) visibility vs viewport(intersecting)
  const callback = (entries) => {
    entries.forEach((entry) => {
      entry.isIntersecting == true
        ? CTA.classList.add("hide")
        : CTA.classList.remove("hide");
    });
  };

  // setup the observer:
  const observer = new IntersectionObserver(callback, options);
  // observe amazon's 'Add to Basket' button
  const amazonButton = document.querySelector("#add-to-cart-button");
  observer.observe(amazonButton);

  ctaFunctionality(amazonButton);
}

//==== setup cta functionality ====//
function ctaFunctionality(amazonButton) {
  // gather required elements
  const amazonsQuantityText = document.querySelector(".a-dropdown-prompt");
  const amazonsHiddenQuantity = document.querySelector("#quantity");
  const ctaQuantityText = document.querySelector("#CTA-quantity");
  const ctaButton = document.querySelector("#CTA-button");

  // listen for change to our CTA quantity
  ctaQuantityText.addEventListener("change", () => {
    // update amazon's quantities accordingly
    amazonsQuantityText.innerHTML = ctaQuantityText.value;
    amazonsHiddenQuantity.value = ctaQuantityText.value;
  });

  //=== update CTA if amazon's quantity has changed ===//
  let previousValue = amazonsHiddenQuantity.value;
  // create the observer:
  const observer = new MutationObserver((mutations) => {
    // map through the array of parameters provided by Mutation Observer
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "value" &&
        // ^check if mutation type matches & attribute name changes
        amazonsHiddenQuantity.value !== previousValue
      ) {
        // update CTA if change found:
        ctaQuantityText.value = amazonsHiddenQuantity.value;
      }
    });
  });
  // observe for the changes on amazonsHiddenQuantity:
  observer.observe(amazonsHiddenQuantity, { attributes: true });
  //=== END OF MUTATION OBSERVER ====//

  // listen for click on CTA and add the item/s to the cart accordingly
  ctaButton.addEventListener("click", () => {
    amazonButton.click();
  });
}
