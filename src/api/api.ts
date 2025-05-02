import Papa from "papaparse";

const entityFileMap = {
  customers: "/mocks/customers.csv",
  products: "/mocks/products.csv",
  orders: "/mocks/orders.csv",
  orderDetails: "/mocks/order_details.csv",
};

const promisifyApi = async (
  data: any,
  delay = 1000
): Promise<{ type: string; data: Array<any> }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!!data) {
        resolve({
          type: "success",
          data,
        });
      } else {
        reject({
          type: "error",
          message: "Error fetching data",
        });
      }
    }, delay || 1000);
  });
};

const processEntityData = async (name: string) => {
  const fileName = entityFileMap[name as keyof typeof entityFileMap];
  let results: string | { data: Array<any> } = await fetch(fileName).then(
    (response) => response.text()
  );

  results = Papa.parse(results as string, {
    header: true,
  });

  return results?.data || [];
};

const getQueries = async (
  delay = 1000
): Promise<{ type: string; data: Array<any> }> => {
  const baseUrl = window.location.origin;
  const data = await fetch(`${baseUrl}/mocks/queries.json`).then((response) =>
    response.json()
  );
  return promisifyApi(data, delay);
};

const getEntities = async (
  name: string,
  delay = 2000
): Promise<{ type: string; data: Array<any> }> => {
  const data = await processEntityData(name);
  return promisifyApi(data, delay);
};

export { getEntities, getQueries };
