import React, {useState, useEffect} from 'react'

function Comment(props) {

    const { content, date } = props.comment
    const d = new Date(date)
    const [dateRefresh, setDateRefresh] = useState(0)
    const refresh = () => {
        setTimeout(() => {setDateRefresh(dateRefresh => dateRefresh++ )}, 3000)
        console.log(dateRefresh)
    }

    useEffect(() => {
      refresh()
       
    }, [dateRefresh])
    
    
    
    const commentWrapperStyle = {
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center'
    };
    const commentTopStyle = {
        display: 'flex',
        padding: '5px 0',
        alignItems: 'center',
        marginBottom: '5px'
    

    }

    const dateStyle = {
        fontSize: '13px'
    }

    const displayCommentDate = () => {
        const timeDiff = Date.now() - d.getTime()
        const day = () => {
            if(d.getDay() < 10)return '0' + d.getDay()
            else return d.getDay()
        }
        const month = () => {
            if(d.getMonth() < 10)return '0' + d.getMonth()
            else return d.getMonth()
        }
        console.log(timeDiff/60000)

        if(timeDiff < 6000) return <div style = {dateStyle}>few seconds ago </div>;
        else if(6000 < timeDiff && timeDiff < 3600000) return <div style = {dateStyle}>{Math.ceil(timeDiff/60000)} minutes ago</div> 
        else return <p style={dateStyle}>{d.getHours()}:{d.getMinutes()} <span style={{ marginLeft: '6px' }} >{day()}.{month()}.{d.getFullYear()} </span></p>

        
    }

    return (
        <div style={commentWrapperStyle}>
            <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f18484', width: '30px', height: '30px', borderRadius: "50%", color: 'white'}} ><span>G</span></div>
            <div style = {{marginLeft: '14px', width: '500px'}}>
                <div style={commentTopStyle}>
                    <p style={{ marginRight: '7px', fontWeight: '600' }} >Guest</p>
                    {displayCommentDate()}
                </div>
                <div>
                    <p style={{ padding: '5px', backgroundColor: 'white', borderRadius: '5px' }} >{content}</p>
                </div>
            </div>

        </div>
    )
}

export default Comment
