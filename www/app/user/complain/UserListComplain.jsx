 
const UserListComplain = ()=>{   
    const mainContext = useContext(MainContext);
    const [isLoading,setisLoading] = useState(false); 
    const [data, setData] = useState([
        {
            no_komplain: '12314188',
            tgl_komplain: '12/01/2023', //tanggal kejadian
            topik: 'Penanganan kurang tepat',
            subtopik2: 'Kurang bersih',
            deskripsi_masalah: 'deskripsi masalah',
            divisi : 'asd',
            status: 'aktif'
        } 
    ]); 
    fetchComplain = async ()=>{ 
      const res =  await PrivateClient.get('/User/Complain/Fetch/index_get');    
      if(res.status){
        setisLoading(false) 
        setData(
            res.data.map((item)=>{
                return {
                    no_komplain: item.NO_KOMPLAIN,
                    tgl_komplain: "Tanggal Komplain : "+item.TGL_TERBIT,
                    topik: item.TOPIK,
                    subtopik2: item.SUB_TOPIK2,
                    deskripsi_masalah: item.DESKRIPSI_MASALAH,
                    divisi: "Dikomplain : "+item.NAMA_DIVISI,
                    status: item.STATUS
                }
            }) 
        )
      }else{  
        UserModel.logout();  
        mainContext.setModalContext({
            open : true,
            message : "Sesi anda telah habis, silahkan login ulang"
        }) 
        history.push("/");
      }
    }
    useEffect(()=>{ 
        setisLoading(true)
        fetchComplain()
    },[])
    return(
        <div> 
            <PageTitle>Daftar Komplain Diajukan</PageTitle>
            <Button icon="fas fa-fw fa-paper-plane mr-2" href="/user/complain/add/pilihDivisi">Ajukan Komplain Baru</Button>
            <div> 
            {isLoading &&<div className="mt-4"> 
                <Loading color="primary"/>
            </div> }
            {!isLoading && data.map((item,index)=>{ 
                return <ComplainCard complain={item} key={index}/>
            })}
            {!isLoading && data.length < 1  && <div className="mt-4">
            <Card1 judul="Belum Ada Komplain Diajukan" isi="" icon="" warna="primary"/>
            </div>}
            </div>
        </div>
    ) 
}