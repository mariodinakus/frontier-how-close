import Mathlib
namespace OpenMathLab.RPQ

/-- An even positive multiple of an odd positive `T` that is `< 2T` cannot exist. -/
theorem no_even_multiple_below_double (T S : ℤ) (hT : 0 < T) (hTodd : Odd T)
    (hSeven : Even S) (hS0 : 0 < S) (hS2 : S < 2 * T) (hdvd : T ∣ S) : False := by
  rcases hdvd with ⟨m, hm⟩
  have hm0 : 0 < m := by
    by_contra h
    push_neg at h
    nlinarith [mul_nonneg hT.le (neg_nonneg.mpr h)]
  have hm2 : m < 2 := by
    by_contra h
    push_neg at h
    nlinarith [mul_nonneg hT.le (sub_nonneg.mpr h)]
  have hm1 : m = 1 := by omega
  subst hm1
  obtain ⟨k, hk⟩ := hSeven
  obtain ⟨j, hj⟩ := hTodd
  omega

/-- Case II core: `T = r²` cannot divide a small even positive sum `U² + V²` of two odd squares. -/
theorem case_two_core (T U V : ℤ) (hT : 0 < T) (hTodd : Odd T)
    (hU : Odd U) (hV : Odd V) (hbound : U ^ 2 + V ^ 2 < 2 * T)
    (hdvd : T ∣ U ^ 2 + V ^ 2) : False := by
  refine no_even_multiple_below_double T (U ^ 2 + V ^ 2) hT hTodd ?_ ?_ hbound hdvd
  · exact (hU.pow).add_odd (hV.pow)
  · have : 0 < U ^ 2 := by
      have : U ≠ 0 := by rintro rfl; simp at hU
      positivity
    nlinarith [sq_nonneg V]

/-- Case I core: `r²` cannot divide `u² - w²` for odd `0 < w < u` coprime to `r`, `u + w < 2 r²`. -/
theorem case_one_core (r u w : ℤ) (hr : Prime r) (hr0 : 0 < r) (hrodd : Odd r)
    (hr2 : ¬ r ∣ 2) (hru : ¬ r ∣ u) (hu : Odd u) (hw : Odd w)
    (hwu : w < u) (hw0 : 0 < w) (hbound : u + w < 2 * r ^ 2)
    (hdvd : r ^ 2 ∣ u ^ 2 - w ^ 2) : False := by
  have hfac : r ^ 2 ∣ (u - w) * (u + w) := by
    have e : u ^ 2 - w ^ 2 = (u - w) * (u + w) := by ring
    rwa [e] at hdvd
  have hT : 0 < r ^ 2 := by positivity
  have hTodd : Odd (r ^ 2) := hrodd.pow
  by_cases h1 : r ∣ u + w
  · have h2 : ¬ r ∣ u - w := by
      intro h2
      have h3 : r ∣ (u + w) + (u - w) := dvd_add h1 h2
      have e : (u + w) + (u - w) = 2 * u := by ring
      rw [e] at h3
      rcases hr.dvd_or_dvd h3 with h | h
      · exact hr2 h
      · exact hru h
    have h4 : r ^ 2 ∣ u + w := hr.pow_dvd_of_dvd_mul_left 2 h2 hfac
    exact no_even_multiple_below_double (r ^ 2) (u + w) hT hTodd (hu.add_odd hw)
      (by omega) hbound h4
  · have h4 : r ^ 2 ∣ u - w := hr.pow_dvd_of_dvd_mul_right 2 h1 hfac
    exact no_even_multiple_below_double (r ^ 2) (u - w) hT hTodd (hu.sub_odd hw)
      (by omega) (by omega) h4

/-- Case III core: `K T² + 2 A² T = C` with `0 < C < 2 A⁴` and `A² < T` forces `K = -1`. -/
theorem case_three_core (A T C K : ℤ) (hA : 0 < A) (hT : A ^ 2 < T)
    (hC0 : 0 < C) (hC1 : C < 2 * A ^ 4) (h : K * T ^ 2 + 2 * A ^ 2 * T = C) :
    K = -1 := by
  have hTpos : 0 < T := by
    have := sq_nonneg A
    linarith
  have h1 : 0 < K * T + 2 * A ^ 2 := by
    by_contra hneg
    push_neg at hneg
    nlinarith [mul_nonneg hTpos.le (neg_nonneg.mpr hneg)]
  have hKneg : K < 0 := by
    by_contra hK
    push_neg at hK
    nlinarith [mul_nonneg (mul_nonneg hK hTpos.le) hTpos.le,
      mul_pos (sub_pos.2 hT) (pow_pos hA 2)]
  have hKgt : -2 < K := by
    by_contra hK
    push_neg at hK
    nlinarith [mul_nonneg (show (0 : ℤ) ≤ -2 - K by omega) hTpos.le]
  omega

#print axioms no_even_multiple_below_double
#print axioms case_two_core
#print axioms case_one_core
#print axioms case_three_core

end OpenMathLab.RPQ
