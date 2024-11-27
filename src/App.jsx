
import { useEffect, useState } from 'react'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import IncomeModal from './components/IncomeModal'
import ExpenseModal from './components/ExpenseModal';

function App() {
  const [income, setIncome] = useState(()=>{
    const getincome=JSON.parse(localStorage.getItem('storeincome'))
    return (getincome) ? getincome: 0;
  });
  const [expenses, setExpenses] = useState(()=>{
    const getExpense=JSON.parse(localStorage.getItem('storeExp'))
    return (getExpense) ? getExpense: [];
  });
  const [balance, setBalance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  
  const [isIncomModalOpen, setIsIncomModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);


  const notify = () => toast.success("Delete are Successfully!" , {
    position: "top-center",
    autoClose: 500,
    transition: Zoom,
    pauseOnHover: true

    });
  // open the income modal function
  const openIncomModal = () => {
    setIsIncomModalOpen(true);
  };

  // close income modal function  
  const handleIncomModalClose = () => {
    setIsIncomModalOpen(false);
  };

  // open the expense modal function
  const openExpenseModal = () => {
    setIsExpenseModalOpen(true);
  };

  // close income modal function  
  const closeExpenseModal = () => {
    setIsExpenseModalOpen(false);
  };

  // add income 
  const handleIncome = (amount) => {
    // es6 +amount is converting string amount to number
    setIncome(income + +amount);
    handleIncomModalClose();
  }


  // add expense func
  const addExpense = (expeseObj) => {
    const newExpAr = [...expenses, expeseObj];

    // update remaining balance
    setExpenses(newExpAr);
  }

// delete index 
const deletei=(ind)=>{
  const deleteiAr= expenses.filter((el,i)=> i != ind)
  setExpenses(deleteiAr)
  notify();
}
const editEl=
  // useEffect(()=>{

  //   let totalExpense = 0;
  //   expenses.forEach((el)=>{
  //     totalExpense += +el.expense;
  //   });
  //   console.log(el)
  //   setExpenses(totalExpense);


  // },[expenses])

  useEffect(() => {
    // calculations
    let totalExpobj = 0;

    expenses.forEach((expi) => {
      totalExpobj += +expi.expense;
    });

    setBalance(income - totalExpobj);
    setTotalExpense(totalExpobj);

    localStorage.setItem('storeExp',JSON.stringify(expenses))
    localStorage.setItem('storeincome',JSON.stringify(income))

  }, [expenses, income]);

console.log(expenses)

// useEffect(()=>{
//   let totalE= 0;
//   expenses.forEach((element)=>{
//     totalE += +element.expense
//   });
//   // setBalance(income - totalE)
//   setTotalExpense(totalE);
// },[expenses,income]);

  return (
    <>
     
      <div className='container'>
        <div className='bg-dark text-white p-3'>
          <h1 className='text-center mb-5'>Expense Tracker</h1>
          <div className='row'>
            <div className='col-md-4 text-center'>
              <h3>Amount In</h3>
              <h5 className='text-success'>${income}</h5>
              <button className='btn btn-success' onClick={openIncomModal}>Add Income</button>

              <IncomeModal handleIncome={handleIncome} isIncomModalOpen={isIncomModalOpen} handleIncomModalClose={handleIncomModalClose} />

            </div>

            <div className='col-md-4 text-center'>
              <h3>Expenses</h3>
              <h5 className='text-warning'>${totalExpense}</h5>
            </div>

            <div className='col-md-4 text-center'>
              <h3>Balance</h3>
              <h5 className='text-danger'>${balance}</h5>
              <button className='btn btn-danger' onClick={openExpenseModal}>Add Expense</button>
              <ExpenseModal addExpense={addExpense} isExpenseModalOpen={isExpenseModalOpen} closeExpenseModal={closeExpenseModal} />
            </div>
          </div>
        </div>
        <div className='p-3 bg-white'>
          <table className='table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {
                expenses.map((exp, i) => {
                  return (
                    <tr key={i}>
                      <td>{exp.date}</td>
                      <td>{exp.detail}</td>
                      <td>{exp.category}</td>
                      <td>${exp.expense}</td>
                      <td><button className='bg-danger rounded-2 border-0 text-white' onClick={()=>{deletei(i)}}>Delete</button></td>
                      <td><button className='bg-success rounded-2 border-0 text-white' onClick={()=>{}}>Edit</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
