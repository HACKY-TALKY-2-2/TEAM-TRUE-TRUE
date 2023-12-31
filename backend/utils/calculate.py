import math
import random
from model import PR, PRCoord
from time import sleep

init_location_sigma = 100
jump_path = 45
merge_criteria = 15

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

def generate_coords(prs, users, seed="seed"):
    width, height = 400, 400
    center = (width/2, height/2)
    radius = (width ** 2 + height ** 2) ** 0.5 / 2

    random.seed(seed)
    personcnt = len(users)
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
      newNext = [0, 0]
      if (abs(next[0] - src_point[0]) > 10 * abs(next[1] - src_point[1])):
        newNext[1] = src_point[1]
        newNext[0] = next[0]
      elif (abs(next[1] - src_point[1]) > 10 * abs(next[0] - src_point[0])):
        newNext[0] = src_point[0]
        newNext[1] = next[1]
      else:
        newNext = list(next)
    
      return find_any_close_point(tuple(newNext), merge_criteria, all_points)

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

    user_pr = [[] for i in range(len(users))]
    for pr in prs:
        ord = users.index(pr.user)
        user_pr[ord].append(pr)
        path = get_next_point(ord, path)
    
    result = []

    for p in range(len(path)):
        temp = []
        for i in range(len(path[p][0]) - 1):
            temp.append(PRCoord(x = path[p][0][i][0], y = path[p][0][i][1], ord = p, pr = user_pr[p][i]))
        result.append(temp)
    return result







