from math import isqrt,gcd
from itertools import combinations,product
from bisect import bisect_right
import json,sys
def scan(N=100, sharper=False):
    lim=isqrt(2*N**4)
    sieve=bytearray(b'\x01')*(lim+1); sieve[:2]=b'\x00\x00'
    for i in range(2,isqrt(lim)+1):
        if sieve[i]: sieve[i*i::i]=b'\x00'*((lim-i*i)//i+1)
    ps=[i for i in range(3,lim+1,2) if sieve[i]]
    res=dict(prime_pairs=0,odd_edges=0,close_divisor_edges=0,primitive_euler_bricks=0,perfect_cuboids=0,largest_a=0)
    for p,q in combinations([x for x in ps if x<=N],2):
        res['prime_pairs']+=1
        for r in ps[bisect_right(ps,q):bisect_right(ps,p*q-1 if sharper else isqrt(2*(p*q)**2-1))]:
            a=p*q*r; aa=a*a
            res['odd_edges']+=1;res['largest_a']=max(res['largest_a'],a)
            ds=sorted(x*y*z for x,y,z in product((1,p,p*p),(1,q,q*q),(1,r,r*r)) if 1<x*y*z<a)
            if not any(u*u<2*w*w for w,u in zip(ds,ds[1:])):continue
            res['close_divisor_edges']+=1
            bs=[(aa//d-d)//2 for d in ds]
            for i,b in enumerate(bs):
                for c in bs[i+1:]:
                    if gcd(gcd(a,b),c)!=1:continue
                    n=b*b+c*c; f=isqrt(n)
                    if f*f!=n:continue
                    res['primitive_euler_bricks']+=1
                    if isqrt(n+aa)**2==n+aa:
                        res['perfect_cuboids']+=1
                        print('FOUND',a,b,c,file=sys.stderr)
    return res
if __name__=='__main__':
    N=int(sys.argv[1]) if len(sys.argv)>1 else 100
    print(json.dumps({'old':scan(N), 'new':scan(N,sharper=True)},indent=2))
