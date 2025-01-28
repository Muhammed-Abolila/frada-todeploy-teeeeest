const ToastComp = ({type,msg}) => {
  if(type=="error"){
      return(
        toast.error({msg}, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce
          })
      )
  }else if(type=="success"){
    return(
      toast.success({msg}, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce
        })
    )
}
}

export default ToastComp
