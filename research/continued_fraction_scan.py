from sympy import primerange,isprime,factorint
from math import isqrt
from bisect import bisect_right
import json

def roots4(r):
    z=2
    while pow(z,(r-1)//2,r)!=r-1:z+=1
    t=pow(z,(r-1)//8,r)
    for j in (1,3,5,7):
        u=pow(t,j,r)
        k=(-(u**4+1)//r*pow(4*u**3,-1,r))%r
        yield u+r*k

def case1(N=2000):
    tested=roots=0; candidates=set(); found=[]
    for r0 in primerange(3,N*N):
        r=int(r0)
        if r%8!=1:continue
        tested+=1; m=r*r
        for k in roots4(r):
            assert (k**4+1)%m==0
            roots+=1
            a,b=k,m; h0,h1=0,1; q0,q1=1,0
            while b:
                n,a,b=a//b,b,a%b
                h0,h1=h1,n*h1+h0; q0,q1=q1,n*q1+q0
                q=q1
                if q>=r:break
                p=k*q-h1*m
                if not (3<=p<q and p<=N and 2*p<r<p*p and r<p*q):continue
                if isprime(p) and isprime(q):candidates.add((p,q,r))
    for p,q,r in sorted(candidates):
        if (p**4+q**4)*(r**4+1)==r*r*(p*p*q*q+1)**2:found.append((p,q,r))
    return dict(p_max=N,r_primes=tested,modular_roots=roots,prime_triples=len(candidates),solutions=found)

def case2(N=10000):
    ps=list(map(int,primerange(3,2*N))); n=0; roots=[]; sqdisc=0
    for p in ps[:bisect_right(ps,N)]:
        x=p*p; X=x*x
        for q in ps[bisect_right(ps,p):bisect_right(ps,isqrt(isqrt(2*X-1)))]:
            y=q*q; Y=y*y; A=Y-X-1; B=2*x*y; C=-(Y-X)-X*Y
            n+=1; D=B*B-4*A*C; d=isqrt(D)
            if d*d==D:
                sqdisc+=1
                for t in [-B+d,-B-d]:
                    if t%(2*A)==0:roots.append((p,q,t//(2*A)))
    return dict(p_max=N,quadratics=n,square_discriminants=sqdisc,integer_roots=roots)

def cases34(N=100000):
    seen=[]; count=0
    for p0 in primerange(3,N+1):
        p=int(p0)
        if p%8!=1:continue
        count+=1
        for s0,e in factorint(p**4+1).items():
            s=int(s0)
            if s>p and e>=2:seen.append((p,s,e))
    return dict(p_max=N,p_mod8_1=count,square_factors=seen)
if __name__=='__main__':
    print(json.dumps(dict(case1=case1(),case2=case2(),cases34=cases34()),indent=2))
