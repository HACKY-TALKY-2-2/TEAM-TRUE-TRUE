import math
import random
import matplotlib.pyplot as plt
from time import sleep

seed = "1A132212K"
jump_generate = 20
jump_path = 15

def polar_to_cartesian(r, theta):
    x = r * math.cos(math.pi * theta / 180)
    y = r * math.sin(math.pi * theta / 180)
    return x, y

def randomize_coordinate(x, y, range):
    random_radius = random.uniform(0, range)
    random_angle = random.uniform(0, 2 * math.pi)

    randomized_x = x + random_radius * math.cos(random_angle)
    randomized_y = y + random_radius * math.sin(random_angle)

    return randomized_x, randomized_y

width, height = 400, 400
center = (width/2, height/2)
radius = (width ** 2 + height ** 2) ** 0.5 / 2

random.seed(seed)
personcnt = 3
order = [0,0,0,0,2,1,1,1,0,1,2,2,2,2,2,1,0,0,1,1,1,1,0,0,0,1,1,0,0,1]
path = [([(0, 0)], random.uniform(0, math.pi)) for i in range(personcnt)]

def get_next_point(personindex, path):
    path_comp = path[personindex][0]
    slope = path[personindex][1]
    end_point_distance_pos = path_comp[0][0] ** 2 + path_comp[0][1] ** 2
    end_point_distance_neg = path_comp[-1][0] ** 2 + path_comp[-1][1] ** 2
    #pos extend
    if (end_point_distance_pos < end_point_distance_neg):
        if (len(path_comp) > 1):
            new_point = (2 * path_comp[0][0] - path_comp[1][0], 2 * path_comp[0][1] - path_comp[1][1])
        else:
            new_point = (path_comp[0][0] + jump_path * math.cos(slope), path_comp[0][0] + jump_path * math.sin(slope))
        path_comp.insert(0, new_point)
    #neg extend
    else:
        if (len(path_comp) > 1):
            new_point = (2 * path_comp[-1][0] - path_comp[-2][0], 2 * path_comp[-1][1] - path_comp[-2][1])
        else:
            new_point = (path_comp[0][0] - jump_path * math.cos(slope), path_comp[0][0] - jump_path * math.sin(slope))
        path_comp.append(new_point)

    path[personindex] = (path_comp, slope)
    return path

random.seed(seed)
for ord in order:
    path = get_next_point(ord, path)


plt.figure(figsize=(7, 7))
cnt = 0

for p, _ in path:
    print(p)
    plt.scatter([x for x, y in p], [y for x, y in p], s=20, c='red' if cnt == 0 else ('blue' if cnt == 1 else 'green'))
    plt.plot([x for x, y in p], [y for x, y in p], c='red' if cnt == 0 else ('blue' if cnt == 1 else 'green'))
    cnt += 1

plt.show()

