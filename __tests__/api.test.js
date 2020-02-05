import http from 'http';
import fetch from 'isomorphic-unfetch';
import listen from 'test-listen';
import { apiResolver } from 'next/dist/next-server/server/api-utils';
import handler from '../pages/api/cdb';

/**
 * The API tests assume the database is set up and working, and the rows are
 * inserted into the table.
 * If you do not wish to run these tests, simply skip them, e.g.
 * describe.skip("API tests", ...)
 */

describe("API tests", () => {
  console.log(`
  * The API tests assume the database is set up and working, and the rows are
  * inserted into the table.
  * If you do not wish to run these tests, simply skip them, e.g.
  * describe.skip("API tests", ...)`);
  let requestHandler = (req, res) => {
    return apiResolver(req, res, undefined, handler);
  }

  it("GET with correct parameters returns 200", async () => {
    let server = http.createServer(requestHandler);
    let url = await listen(server);
    let response = await fetch(url +
      '?investmentDate=2018-01-05' +
      '&currentDate=2018-01-15' +
      '&cdbRate=105.5');
    expect(response.status).toBe(200);
    expect(await response.json()).toStrictEqual(
      [
        { "date": "2018-01-05", "unitPrice": 1000.27898 },
        { "date": "2018-01-08", "unitPrice": 1000.55805 },
        { "date": "2018-01-09", "unitPrice": 1000.83719 },
        { "date": "2018-01-10", "unitPrice": 1001.1164 },
        { "date": "2018-01-11", "unitPrice": 1001.3957 },
        { "date": "2018-01-12", "unitPrice": 1001.67507 },
        { "date": "2018-01-15", "unitPrice": 1001.95452 }
      ]
    );
    server.close();
  });

  it("GET with incorrect parameters returns 400", async () => {
    let server = http.createServer(requestHandler);
    let url = await listen(server);
    let response = await fetch(url +
      '?investmentDate=wrongDateFormat' +
      '&currentDate=2018-01-15' +
      '&cdbRate=105.5');
    expect(response.status).toBe(400);
    expect(await response.json()).toStrictEqual({
      'message': 'One or more parameters are incorrect. Date format: yyyy-MM-dd :: cdbRate: number'
    });
    server.close();
  });

  it("GET with no parameters returns 400", async () => {
    let server = http.createServer(requestHandler);
    let url = await listen(server);
    let response = await fetch(url);
    expect(response.status).toBe(400);
    expect(await response.json()).toStrictEqual({
      'message': 'One or more parameters missing'
    });
    server.close();
  });

})