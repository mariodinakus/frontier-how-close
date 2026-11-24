from itertools import product
import json
def scan(m):
    squares = {x*x % m for x in range(m)}
    count = 0
    for a,b,c in product(range(m), repeat=3):
        aa,bb,cc = a*a,b*b,c*c
        if all(s % m in squares for s in (aa+bb,aa+cc,bb+cc,aa+bb+cc)):
            count += 1
            if m == 3: assert sum(x == 0 for x in (a,b,c)) >= 2
            if m in (5,7,11,19): assert 0 in (a,b,c)
    return {"modulus":m,"accepted":count,"total":m**3}
if __name__ == "__main__":
    print(json.dumps([scan(m) for m in (3,5,7,9,11,16,19,64)],indent=2))
