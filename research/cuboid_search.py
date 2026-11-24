"""Exact bounded search using intersections of Pythagorean adjacency sets."""
from math import isqrt, gcd
import sys, json
def square(x): return isqrt(x)**2 == x
def search(n):
    adj=[set() for _ in range(n+1)]
    for a in range(1,n+1):
        for b in range(a+1,n+1):
            if square(a*a+b*b):
                adj[a].add(b)
    bricks=0
    primitive=0
    perfect=[]
    for a in range(1,n+1):
        for b in sorted(adj[a]):
            for c in sorted(adj[a]&adj[b]):
                bricks+=1
                if gcd(gcd(a,b),c)==1: primitive+=1
                if square(a*a+b*b+c*c): perfect.append((a,b,c))
    return {"max_edge":n,"euler_bricks":bricks,"primitive_euler_bricks":primitive,"perfect_cuboids":perfect}
if __name__ == "__main__":
    print(json.dumps(search(int(sys.argv[1]) if len(sys.argv)>1 else 1000),indent=2))
