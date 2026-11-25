from math import isqrt
from bisect import bisect_right
from sympy import primerange, factorint, isprime
import json, sys

def square_roots(a,b,c):
    if not a:
        if b and (-c)%b==0: return [-c//b]
        if not b and not c: raise ValueError('identically zero')
        return []
    D=b*b-4*a*c
    if D<0: return []
    d=isqrt(D)
    if d*d!=D:return []
    return list({n//(2*a) for n in (-b+d,-b-d) if n%(2*a)==0})

def scan(N):
    ps=list(primerange(3,N*N+1)); small=ps[:bisect_right(ps,N)]
    counts=[0]*4; integral_roots=[0]*4; found=[]
    def check(i,p,q,roots):
        integral_roots[i]+=len(roots)
        for t in roots:
            if t<=0:continue
            r=isqrt(t)
            if r*r==t and q<r<p*q and isprime(r):found.append((i+1,p,q,r))
    for p in small:
        x=p*p; X=x*x
        for q in ps[bisect_right(ps,p):bisect_right(ps,x-1)]:
            y=q*q; Y=y*y; counts[0]+=1
            check(0,p,q,square_roots(X+Y,-(x*y+1)**2,X+Y))
        for q in ps[bisect_right(ps,p):bisect_right(ps,isqrt(isqrt(2*X-1)))]:
            y=q*q;Y=y*y;counts[1]+=1
            check(1,p,q,square_roots(Y-X-1,2*x*y,-(Y-X)-X*Y))
        for z,e in factorint(X+1).items():
            z=int(z)
            if z<=p or e<2:continue
            r=z; w=r*r; W=w*w; counts[2]+=1
            roots=square_roots(X+1-x*w,-2*x*w,(X+1)*W-x*w)
            integral_roots[2]+=len(roots)
            for t in roots:
                if t<=0:continue
                q=isqrt(t)
                if q*q==t and p<q<r<p*q and isprime(q):found.append((3,p,q,r))
        for z,e in factorint(X+1).items():
            q=int(z)
            if q<=p or e<2 or q*q>=2*x:continue
            y=q*q;Y=y*y; counts[3]+=1
            check(3,p,q,square_roots(X+1-x*y,-2*x*y,(X+1)*Y-x*y))
    return dict(p_max=N,primes_tested=len(small),quadratics=counts,integer_roots_before_filters=integral_roots,solutions=found)
if __name__=='__main__':print(json.dumps(scan(int(sys.argv[1]) if len(sys.argv)>1 else 1009),indent=2))
