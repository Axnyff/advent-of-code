function BuildHands(data)
  let l:newdata = deepcopy(a:data)
  let l:hands = []
  while len(l:newdata) != 0
    let l:newHand = []
    while len(l:newdata) != 0 && l:newdata[0] != ""
      call add(l:newHand, split(l:newdata[0]))
      let l:newdata = l:newdata[1:-1]
    endwhile
    call add(l:hands, l:newHand)
    let l:newdata = l:newdata[1:-1]
  endwhile
  return l:hands
endfunction

function IsWinning(hand, input)
  let l:handcopy = deepcopy(a:hand)
  let l:total = 0

  let l:horizontal = []
  for _ in l:handcopy
    call add(l:horizontal, 0)
  endfor

  let l:vertical = []
  for _ in l:handcopy[0]
    call add(l:vertical, 0)
  endfor

  let l:i = 0
  while i < len(handcopy[0])
    let l:j = 0
    while j < len(handcopy[0])
      let l:value = l:handcopy[i][j]
      if index(a:input, l:value) != -1
        let l:count = l:horizontal[i]
        call remove(l:horizontal, i)
        let l:horizontal = insert(l:horizontal, l:count + 1, i)

        let l:count = l:vertical[j]
        call remove(l:vertical, j)
        let l:vertical = insert(l:vertical, l:count + 1, j)
        let l:total = l:total + (+ l:value)
      endif
      let l:j = l:j + 1
    endwhile
    let l:i = l:i + 1
  endwhile

  let l:winning = v:false

  for i in l:horizontal
    if i == 5
      let l:winning = v:true
    endif
  endfor

  for i in l:vertical
    if i == 5
      let l:winning = v:true
    endif
  endfor

  if l:winning
    let l:sum = - l:total
    for l in l:handcopy
      for item in l
        let l:sum = l:sum + item
      endfor
    endfor

    return l:sum
  else
    return 0
  endif
endfunction

function Solve()
  let l:data = readfile("input")
  let l:nums = split(l:data[0], ",")
  let l:data = l:data[2:-1]
  for num in split(l:data[0], ",")
    call add(l:nums, +num)
  endfor
  let l:hands = BuildHands(l:data)

  let l:index = 0
  while v:true
    let l:col = l:nums[0:index]
    let l:i = len(hands) - 1
    while i >= 0
      let l:win = IsWinning(hands[i], l:col)
      if l:win != 0
        call remove(hands, i)
        if (len(hands) == 0)
          echom l:win * l:nums[index]
          return
        endif
      endif
      let i = i - 1
    endwhile
    let l:index = l:index + 1
  endwhile
endfunction
call Solve()


