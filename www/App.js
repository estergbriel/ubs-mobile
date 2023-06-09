const App = ()=> {        
    
    const [modalContext, setModalContext] = useState({
        open : false,
        message : ""
    })  
    const [routeContext,setRouteContext] = useState("/")
    return (
        <div className="modal-open"> 
            <React.Suspense fallback={<h1>Loading...</h1>}> 
                <MainContext.Provider value={{modalContext,setModalContext}}> 
                    <RouteContext.Provider value={{routeContext,setRouteContext}}> 
                            <HashRouter>    
                                <Switch>   
                                    <Route path="/user">
                                        <UserHomePage/>
                                    </Route> 
                                    <Route path="/admin">
                                        <AdminHomePage/>
                                    </Route>
                                    <Route path="/gm">
                                        <GMHomePage/>
                                    </Route>
                                    <Route path="/manager">
                                        <ManagerHomePage/>
                                    </Route>
                                    <Route exact path="/">
                                        <LoginPage/>
                                    </Route>   
                                    <Route>
                                        <Error404Page/>
                                    </Route>
                                </Switch>  
                            </HashRouter>   

                            {modalContext.open &&<Modal message={modalContext.message} />  }
                            
                    </RouteContext.Provider>
                </MainContext.Provider>
            </React.Suspense>  
        </div>
    )
}
ReactDOM.render(<App/>,document.getElementById("root"));