const vendor = 'zillow';
function parse(document, sendResponse) {
  const products = document.querySelectorAll('article.list-card');
  let result:any[] = [];
  let errors:any[] = [];
  [].forEach.call(products, function (product: any) {
    try {
      const price = product.querySelectorAll('.list-card-price')[0]?.innerText;
      const name = product.querySelectorAll('.list-card-details')[0].innerText;
      const pathname = new URL(document.URL).pathname;
      //Ignore if we don't have price data
      if (!price) {
        return;
      }
      const parsedData = {pathname, price, name};
      result.push(parsedData)
    }
    catch (e) {
      console.error('Did not parse one items', e);
      errors.push(e);
    }
  });
  // Pass it back
  sendResponse(JSON.stringify({ data: result, vendor, errors }, null, 2));
}

const urlRegex = /^https?:\/\/(?:[^./?#]+\.)?zillow\.com\/homes\/*/;
export default {vendor, parse, urlRegex};