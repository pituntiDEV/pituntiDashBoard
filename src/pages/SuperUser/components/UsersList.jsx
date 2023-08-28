import React, { useState } from 'react'
import { useEffect } from 'react'
import useFetchApi from '../../../hook/useFetchApi'
import "./UsersList.scss"
const utils = require("../../../utils/date/index")
export const UsersList = () => {
  const [sales, setSales] = useState([]);
  const [total, setTotal] = useState(0);
  const [getSales, loading] = useFetchApi({
    url: `/api/sales`,
    method: "GET"
  })

  useEffect(() => {
    getSales()
      .then(data => {
        setSales(data);
        const allSalesTotal = data.reduce((acc, sale) => {
          acc += sale.payment;
          return acc;
        }, 0)

        setTotal(allSalesTotal)
      })

  }, [])
  return (
    <>
      <h3 className='text-center'>Total:{total}</h3>
      <div className='sales__users__list'>
        {
          sales.map(sale => {
            return (
              <div key={sale._id} className="user">
                <small>Fecha</small>
                <div> {utils.formatDate(sale.createdAt)}</div>
                <hr />
                {sale.user.name}
                <p>{sale.user.email}</p>
                <p>{sale.comments}</p>
                <p>${sale.payment}</p>
                <p className='text-info fw-bold'>Plan:{sale.plan}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
