import Papa from "papaparse";

const entityFileMap = {
  customers: "/public/mocks/customers.csv",
  products: "/public/mocks/products.csv",
  orders: "/public/mocks/orders.csv",
  orderDetails: "/public/mocks/order_details.csv",
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
  const data = await fetch(`${baseUrl}/public/mocks/queries.json`).then(
    (response) => response.json()
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
