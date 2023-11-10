import math
import random
import matplotlib.pyplot as plt

seed = "1A132212K"
init_location_sigma = 10
jump_path = 15
personcnt = 3
order = [0,0,2,0,0,2,1,1,1,0,1,2,2,2,2,2,1,0,0,1,1,1,1,0,0,0,1,1,0,0,1, 0,0,2,0,0,2,1,1]
merge_criteria = 5

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
path = [([(random.uniform(-init_location_sigma, init_location_sigma), random.uniform(-init_location_sigma, init_location_sigma))], random.uniform(0, math.pi)) for i in range(personcnt)]
all_points = []
for pa in path:
    for p in pa[0]:
        all_points.append(p)

def find_any_close_point(point, criteria, cluster):
    for other_point in cluster:
        distance = ((point[0] - other_point[0]) ** 2 + (point[1] - other_point[1]) ** 2) ** 0.5
        if(distance < criteria):
            return other_point
    else:
        return point

def next_point(src_point, slope, distance, all_points = []):
    next = (src_point[0] + distance * math.cos(slope), src_point[1] + distance * math.sin(slope))
    return find_any_close_point(next, merge_criteria, all_points)

def get_next_point(personindex, path):
    path_comp = path[personindex][0]
    slope = path[personindex][1]
    end_point_distance_pos = path_comp[0][0] ** 2 + path_comp[0][1] ** 2
    end_point_distance_neg = path_comp[-1][0] ** 2 + path_comp[-1][1] ** 2

    #pos extend
    if (end_point_distance_pos < end_point_distance_neg):
        if (len(path_comp) > 1):
            slope = math.atan2(path_comp[0][1] - path_comp[1][1], path_comp[0][0] - path_comp[1][0])
            new_point = next_point(path_comp[0], slope + random.uniform(-math.pi/10, math.pi/10), jump_path + random.uniform(-jump_path/3, jump_path/3), all_points)
        else:
            new_point = (path_comp[0][0] + jump_path * math.cos(slope), path_comp[0][0] + jump_path * math.sin(slope))
        path_comp.insert(0, new_point)
        all_points.append(new_point)
    #neg extend
    else:
        if (len(path_comp) > 1):
            slope = math.atan2(path_comp[-1][1] - path_comp[-2][1], path_comp[-1][0] - path_comp[-2][0])
            new_point = next_point(path_comp[-1], slope + random.uniform(-math.pi/10, math.pi/10), jump_path + random.uniform(-jump_path/3, jump_path/3), all_points)
        else:
            new_point = (path_comp[0][0] - jump_path * math.cos(slope), path_comp[0][0] - jump_path * math.sin(slope))
        path_comp.append(new_point)
        all_points.append(new_point)

    path[personindex] = (path_comp, slope)
    return path

random.seed(seed)
for ord in order:
    path = get_next_point(ord, path)


plt.figure(figsize=(7, 7))
cnt = 0

for p, _ in path:
    plt.scatter([x for x, y in p], [y for x, y in p], s=20, c='red' if cnt == 0 else ('blue' if cnt == 1 else 'green'))
    plt.plot([x for x, y in p], [y for x, y in p], c='red' if cnt == 0 else ('blue' if cnt == 1 else 'green'))
    cnt += 1

plt.show()

