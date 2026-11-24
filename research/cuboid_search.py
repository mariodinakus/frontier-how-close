"""Exact bounded search by complete Euclidean generation of Pythagorean pairs."""
from math import isqrt, gcd
import sys, json
def square(x): return isqrt(x)**2 == x
def search(n):
    adj=[set() for _ in range(n+1)]
    # For both legs <= n, the hypotenuse is <= sqrt(2)*n < 2*n.
    # Hence the Euclidean parameter u satisfies u*u < 2*n.
    for u in range(2,isqrt(2*n)+2):
        for v in range(1,u):
            if (u-v)%2==0 or gcd(u,v)!=1: continue
            a,b=sorted((u*u-v*v,2*u*v))
            for k in range(1,n//b+1):
                adj[k*a].add(k*b)
    bricks=primitive=0
    perfect=[]
    for a in range(1,n+1):
        for b in sorted(adj[a]):
            for c in sorted(adj[a]&adj[b]):
                bricks+=1
                primitive+=gcd(gcd(a,b),c)==1
                if square(a*a+b*b+c*c): perfect.append((a,b,c))
    return {"max_edge":n,"euler_bricks":bricks,"primitive_euler_bricks":primitive,"perfect_cuboids":perfect}
if __name__ == "__main__":
    print(json.dumps(search(int(sys.argv[1]) if len(sys.argv)>1 else 100000),indent=2))
