import { debounce } from '../../../main/commom/async/debounce';

describe('test debounce', ()=>{
    it('should works right', async function() {
        let a = 0
        async function addA(){
            await debounce(500)
            a++
        }
        await new Promise(r=>{
            let count = 0;
            let t = setInterval(()=>{
                count++;
                addA()
                if (count === 6) {
                    clearInterval(t)
                    setTimeout(()=>{
                        addA()
                        setTimeout(()=>{
                            r(undefined)
                        }, 600)
                    }, 600)
                }
            }, 400)
        })
        expect(a).toBe(2)
    });
})