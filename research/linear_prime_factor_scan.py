from math import isqrt,prod
from bisect import bisect_right
from sympy import primerange,factorint
import json,sys

def scan(N):
    ps=list(map(int,primerange(3,N+1)))
    allps=list(map(int,primerange(3,2*N+1)))
    old_pass=0; survivors=[]; pairs=0; kernel_pass=0
    for p in ps:
        odd=[int(l) for l,e in factorint(p**4+1).items() if l!=2 and e%2]
        old=all(2*l-p*p<=0 or (2*l-p*p)**2<2*p**4 for l in odd)
        new=all(2*l-p<=1 or (2*((2*l-p)**2-1))**2<p**5 for l in odd)
        old_pass+=old
        if not new: continue
        survivors.append(p)
        K=prod(odd)
        for q in allps[bisect_right(allps,p):bisect_right(allps,isqrt(isqrt(2*p**4-1)))]:
            pairs+=1
            kernel_pass+=pow(q,8,K)==1%K
    return dict(p_max=N,odd_primes=len(ps),old_pass=old_pass,new_pass=len(survivors),survivors=survivors,remaining_pairs=pairs,kernel_pass=kernel_pass)
if __name__=='__main__':print(json.dumps(scan(int(sys.argv[1]) if len(sys.argv)>1 else 30000),indent=2))
