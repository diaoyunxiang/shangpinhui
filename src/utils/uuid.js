import { v4 as uuidv4} from 'uuid'
// 生成一个随机的字符串
export const getUuid=()=>{
    // 调取本地存储
   let uuid=localStorage.getItem('uuid_token');
    // 如果没有本地存储
    if(!uuid){
        uuid=uuidv4();
    }
   localStorage.setItem('uuid_token',uuid)
   return uuid;
}