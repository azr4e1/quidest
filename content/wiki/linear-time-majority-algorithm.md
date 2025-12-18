+++
toc = true
hideReply = true
title = "Linear Time Majority Algorithm"
author = "Lorenzo Drumond"
date = "2024-03-12T22:55:56"
tags = ["linear",  "golang",  "algorithm",  "programming",  "sequence",  "computer_science",  "array",  "coding",  "majority",  "snippet"]
+++


Given an array of length n, calculate the majority element, which is the element which appears `>= n/2 + 1`, with time complexity O(n) and space complexity of O(1)

We will sweep down the sequence starting at the pointer position shown above.

As we sweep we maintain a pair consisting of a current candidate and a counter. Initially, the current candidate is unknown and the counter is 0.

When we move the pointer forward over an element e:

1. If the counter is 0, we set the current candidate to e and we set the counter to 1.
2. If the counter is not 0, we increment or decrement the counter according to whether e is the current candidate.

When we are done, the current candidate is the majority element, if there is a majority.

```golang
type Vote struct {
	Candidate int
	Vote      int
}

func MajorityElement(nums []int) int {
	vote := new(Vote)
	for _, v := range nums {
		if vote.Vote == 0 {
			vote.Candidate = v
			vote.Vote = 1
			continue
		}
		if v == vote.Candidate {
			vote.Vote++
		} else {
			vote.Vote--
		}
	}

	return vote.Candidate
}
```

## References
- https://www.cs.utexas.edu/~moore/best-ideas/mjrty/example.html
