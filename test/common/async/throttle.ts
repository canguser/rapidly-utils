import { throttle } from '../../../main/commom/async/throttle';

describe('test throttle', ()=>{
    it('should works right', async function() {
        let a = 0
        async function addA(){
            await throttle(1000)
            a++
        }
        await new Promise(r=>{
            let count = 0;
            let t = setInterval(()=>{
                count++;
                addA().then(()=>console.log(count))
                if (count === 6) {
                    clearInterval(t)
                    setTimeout(()=>{
                        r(undefined)
                    }, 1000)
                }
            }, 600)
        })
        expect(a).toBe(3)
    });
})