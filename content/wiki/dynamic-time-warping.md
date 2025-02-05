+++
date = '2025-02-05T11:05:29Z'
title = 'Dynamic Time Warping'
hideReply = true
tags = ['machine learning', 'time series', 'algorithm', 'programming', 'statistics', 'forecasting']
+++

![Dynamic Time Warping](/images/dynamic-time-warping.png)

__Dynamic time warping (DTW)__ is an algorithm for measuring similarity between two temporal sequences, which may vary in speed. For instance, similarities in walking could be detected using DTW, even if one person was walking faster than the other, or if there were accelerations and decelerations during the course of an observation

DTW is a method that calculates an optimal match between two given sequences (e.g. time series) with certain restriction and rules:

- Every index from the first sequence must be matched with one or more indices from the other sequence, and vice versa
- The first index from the first sequence must be matched with the first index from the other sequence (but it does not have to be its only match)
- The last index from the first sequence must be matched with the last index from the other sequence (but it does not have to be its only match)
- The mapping of the indices from the first sequence to indices from the other sequence must be monotonically increasing, and vice versa, i.e. if $j > i$ are indices from the first seuence, then there must not be two indices $l > k$ in the other sequence, such that index $i$ is matched with $l$ and $j$ is matched with $k$.

We can plot each match between the sequences $1 : M$ and $1 : N$ as a path in a $M \times N$ matrix from $(1, 1)$ to $(M, N)$ such that each step is one of $(0, 1), (1, 0), (1, 1)$.

The optimal match is denoted by the match that satisfies all the restrictions and the rules and that has the minimal cost, where the cost is computed as the sum of absolute differences, for each matched pair of indices, between their values.

## Implementation

```go
type Pair struct {
	x int
	y int
}

type distance func(int, int) int

func DTWDistance(s, t []int, dist distance) []Pair {
	matrix := [][]int{}
	n, m := len(s), len(t)
	for i := 0; i < n+1; i++ {
		row := []int{}
		for j := 0; j < m+1; j++ {
			row = append(row, int(math.Inf(1)))
		}
		matrix = append(matrix, row)
	}
	matrix[0][0] = 0

	for i := 0; i < n; i++ {
		for j := 0; j < m; j++ {
			cost := dist(s[i], t[j])
			matrix[i+1][j+1] = cost + min(matrix[i][j+1], matrix[i+1][j], matrix[i][j])
		}
	}
	path := []Pair{{0, 0}}
	for i, j := 1, 1; i < n && j < m; {
		costs := map[int]Pair{
			matrix[i][j+1]: {i, j + 1},
			matrix[i+1][j]: {i + 1, j},
			matrix[i][j]:   {i, j},
		}
		var pair Pair
		minVal := int(math.Inf(1))
		for k, v := range costs {
			if k < minVal {
				minVal = k
				pair = v
			}
		}
		path = append(path, pair)
	}
	return path
}
```

## References

- https://en.wikipedia.org/wiki/Dynamic_time_warping
