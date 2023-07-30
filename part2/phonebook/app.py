'''import django   and a basic framework for web applications'''
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Question

# Create your views here.
def index(request):
    # return

    # return HttpResponse("Hello, world. You're at the polls index.")

    # latest_question_list = Question.objects.order_by('-pub_date')[:5]

    # output = ', '.join([q.question_text for q in latest_question_list])
    
