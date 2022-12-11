import React, { Fragment } from "react";
import "./table.css";
export default function Table({ data }) {
  return (
    <>
      <table>
        <tbody>
          <Fragment>
            <tr>
              <td class="const">Call</td>
              <td class="var"> {data.option}</td>
            </tr>
            <tr>
              <td class="const">IV</td>
              <td class="var">{data.iv}</td>
            </tr>
            <tr>
              <td class="const">Delta</td>
              <td class="var">{data.delta}</td>
            </tr>
            <tr>
              <td class="const">Gamma</td>
              <td class="var">{data.gamma}</td>
            </tr>
            <tr>
              <td class="const">Vega</td>
              <td class="var">{data.vega}</td>
            </tr>
            <tr>
              <td class="const">Theta</td>
              <td class="var">{data.theta}</td>
            </tr>
            <tr>
              <td class="const">Rho</td>
              <td class="var">{data.rho}</td>
            </tr>
          </Fragment>
        </tbody>
      </table>
    </>
  );
}
