function Error({code,msg}) {
  return (
    <div className="h-[100vh] flex items-center justify-center lg:justify-start p-5 flex-col">
         <p className="text-center">{code}: {msg}</p>
        <img  className="w-[60%] lg:w-[35%]" src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" alt="" />
    </div>
  )
}
export default Error