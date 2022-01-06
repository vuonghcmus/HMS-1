function changeValue(inputID,operator)
{
    var input=document.getElementById(inputID);
    const price = parseInt(document.querySelector(`[data-id="${inputID}"]`).innerText.split('$')[0])
    console.log(price)
    let totalAmount = document.querySelector('.total-amount')
    const value=parseInt(input.value);
    if(value<0)
    {
        input.value=0;
        return;
    }
    const currentTotalAmount = parseInt(totalAmount.querySelector('span').innerText)
    if(operator=='+')
    {
        input.value=value+1;

        totalAmount.querySelector('span').innerText = currentTotalAmount + price
    }
    if(operator=='-')
    {
        if(value>0)
        {
            input.value=value-1;
            totalAmount.querySelector('span').innerText = currentTotalAmount - price
        }
    }
}